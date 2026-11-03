/*
 * Cookie consent for nuo-stems.com and docs.nuo-stems.com.
 *
 * The same file is served by both sites: src-marketing-website/public/consent.js and
 * src-docs-website/docs-repo/static/consent.js. Keep the two copies identical.
 *
 * Tracking scripts are in the page as <script type="text/plain" data-consent="analytics"> or
 * data-consent="marketing". The browser does not run them; this file runs them, in page order,
 * once the visitor agrees to that category. Without a choice nothing is loaded (EU ePrivacy rules:
 * no non-essential cookies or tracking before opt-in consent). The choice is kept in a cookie on
 * .nuo-stems.com, so one choice covers both sites; that cookie itself is strictly necessary.
 *
 * PostHog is the exception: it always loads, in cookieless mode (cookieless_mode: "on_reject" with
 * opt_out_capturing_by_default), which stores nothing in the browser and counts visitors with a
 * daily-changing hash on PostHog's servers. With analytics consent it is opted in and uses cookies
 * (syncPostHog). The PostHog project must have cookieless tracking enabled
 * (Settings > Project > Web analytics), or PostHog discards the cookieless events.
 *
 * Any element with a data-cookie-settings attribute (the "Cookie settings" link in the footers)
 * opens the settings again. Withdrawing consent removes the trackers' cookies and reloads the page.
 */
(function () {
  "use strict";
  // Once per page load: Astro view transitions keep `window` between pages
  if (window.nuoConsent) return;

  var COOKIE_NAME = "nuo_consent";
  var COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // ask again after about 6 months
  var POLICY_URL = "https://nuo-stems.com/privacy";
  var CATEGORIES = [
    {
      id: "analytics",
      label: "Analytics",
      description:
        "Helps us understand how the site is used (PostHog, Microsoft Clarity, Amplitude), including recordings of how pages are used. Without it, we only count visits, without cookies.",
    },
    {
      id: "marketing",
      label: "Marketing",
      description:
        "Measures our advertising and newsletter (Google Tag Manager, Meta Pixel, eSputnik).",
    },
  ];
  // First-party cookies and storage keys the trackers create, removed when consent is withdrawn
  // and on every page load without consent
  var TRACKER_PATTERNS = {
    analytics: [/^ph_/, /^_clck/, /^_clsk/, /^CLID/, /^AMP_/, /^amp_/, /^EXP_/, /^_cltk/],
    marketing: [/^_ga/, /^_gid/, /^_gat/, /^_gcl/, /^_fbp/, /^_fbc/],
  };
  // eSputnik's, removed only when marketing consent is withdrawn: its forms also work without
  // consent (loaded on demand) and keep their state there, e.g. not to show a pop-up again
  var ESPUTNIK_PATTERNS = [/^sc$/, /^es/, /^f\.session/, /^f\.page/, /\.interactions$/];

  // Google Consent Mode: everything denied until the visitor chooses. Google Tag Manager itself
  // only loads with marketing consent; this tells the Google tags inside it what was agreed to.
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });

  // ---- The stored choice ----

  // Cookie value: "1.a1.m0" = format version 1, analytics yes, marketing no
  function readChoice() {
    var match = document.cookie.match(new RegExp("(?:^|; )" + COOKIE_NAME + "=([^;]*)"));
    var parsed = match && /^1\.a([01])\.m([01])$/.exec(decodeURIComponent(match[1]));
    if (!parsed) return null;
    return { analytics: parsed[1] === "1", marketing: parsed[2] === "1" };
  }

  function cookieDomain() {
    var host = location.hostname;
    return host === "nuo-stems.com" || /\.nuo-stems\.com$/.test(host) ? ".nuo-stems.com" : null;
  }

  function saveChoice(choice) {
    var value = "1.a" + (choice.analytics ? 1 : 0) + ".m" + (choice.marketing ? 1 : 0);
    var domain = cookieDomain();
    document.cookie =
      COOKIE_NAME + "=" + value +
      "; Max-Age=" + COOKIE_MAX_AGE_SECONDS +
      "; Path=/; SameSite=Lax" +
      (location.protocol === "https:" ? "; Secure" : "") +
      (domain ? "; Domain=" + domain : "");
  }

  // ---- Running the blocked scripts ----

  var active = { analytics: false, marketing: false };

  // Runs the blocked scripts of the agreed categories, in page order. A script with `src` is
  // waited for, because the script after it usually uses it (Amplitude's loader, then its init).
  function activate(choice) {
    gtag("consent", "update", {
      ad_storage: choice.marketing ? "granted" : "denied",
      ad_user_data: choice.marketing ? "granted" : "denied",
      ad_personalization: choice.marketing ? "granted" : "denied",
      analytics_storage: choice.analytics ? "granted" : "denied",
    });
    CATEGORIES.forEach(function (category) {
      if (choice[category.id]) active[category.id] = true;
    });
    var blocked = Array.prototype.slice.call(
      document.querySelectorAll('script[type="text/plain"][data-consent]'),
    );
    var queue = blocked.filter(function (script) {
      return choice[script.getAttribute("data-consent")] && !script.hasAttribute("data-consent-ran");
    });
    (function runNext() {
      var original = queue.shift();
      if (!original) return;
      original.setAttribute("data-consent-ran", "");
      var script = document.createElement("script");
      for (var i = 0; i < original.attributes.length; i++) {
        var attribute = original.attributes[i];
        if (!/^(type|data-consent|data-consent-ran)$/.test(attribute.name)) {
          script.setAttribute(attribute.name, attribute.value);
        }
      }
      if (original.src) {
        script.async = false;
        script.onload = script.onerror = runNext;
        script.src = original.src;
        original.parentNode.insertBefore(script, original.nextSibling);
      } else {
        script.text = original.text;
        original.parentNode.insertBefore(script, original.nextSibling);
        runNext();
      }
    })();
  }

  function forgetTrackers(categoryIds, includeEsputnik) {
    var patterns = includeEsputnik ? ESPUTNIK_PATTERNS.slice() : [];
    categoryIds.forEach(function (id) {
      patterns = patterns.concat(TRACKER_PATTERNS[id] || []);
    });
    var matches = function (name) {
      return patterns.some(function (pattern) {
        return pattern.test(name);
      });
    };
    var host = location.hostname;
    var domains = ["", host, "." + host, cookieDomain() || ""];
    document.cookie.split("; ").forEach(function (entry) {
      var name = entry.split("=")[0];
      if (!matches(name)) return;
      domains.forEach(function (domain) {
        document.cookie =
          name + "=; Max-Age=0; Path=/" + (domain ? "; Domain=" + domain : "");
      });
    });
    try {
      Object.keys(localStorage).forEach(function (key) {
        if (matches(key)) localStorage.removeItem(key);
      });
    } catch (e) {
      // Storage can be unavailable (private mode, blocked site data)
    }
  }

  // PostHog runs cookieless until analytics consent. Called on a new choice, and by PostHog's
  // `loaded` callback in the page (the library loads after this file).
  function syncPostHog(posthog) {
    var ph = posthog || window.posthog;
    if (!ph || !ph.__loaded) return;
    var choice = readChoice();
    if (choice && choice.analytics) {
      if (!ph.has_opted_in_capturing()) ph.opt_in_capturing();
    } else if (ph.has_opted_in_capturing()) {
      ph.opt_out_capturing(); // back to cookieless
    }
  }

  function applyChoice(choice) {
    var withdrawn = CATEGORIES.filter(function (category) {
      return active[category.id] && !choice[category.id];
    }).map(function (category) {
      return category.id;
    });
    saveChoice(choice);
    hideBanner();
    syncPostHog();
    // For page code that waits for consent (e.g. identifying the visitor on /onboarding)
    document.dispatchEvent(new CustomEvent("nuo-consent", { detail: choice }));
    if (withdrawn.length > 0) {
      // Trackers that already run cannot be stopped in place: remove their data and reload
      forgetTrackers(withdrawn, withdrawn.indexOf("marketing") !== -1);
      location.reload();
      return;
    }
    activate(choice);
  }

  // ---- The banner ----

  var banner = null;

  function button(text, primary, onClick) {
    var element = document.createElement("button");
    element.type = "button";
    element.textContent = text;
    element.style.cssText =
      "font:inherit;font-size:14px;font-weight:600;padding:8px 16px;border-radius:8px;cursor:pointer;" +
      (primary
        ? "background:#f3f4f6;color:#111827;border:1px solid #f3f4f6;"
        : "background:transparent;color:#f3f4f6;border:1px solid #4b5563;");
    element.addEventListener("click", onClick);
    return element;
  }

  function buildBanner(showSettings) {
    var current = readChoice() || { analytics: false, marketing: false };
    var root = document.createElement("div");
    root.id = "nuo-consent";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-label", "Cookie consent");
    root.style.cssText =
      "position:fixed;left:16px;right:16px;bottom:16px;z-index:2147483000;margin:0 auto;max-width:640px;" +
      "box-sizing:border-box;padding:20px;border-radius:12px;border:1px solid #374151;background:#111827;" +
      "color:#f3f4f6;font-family:system-ui,-apple-system,'Segoe UI',sans-serif;font-size:14px;line-height:1.5;" +
      "box-shadow:0 10px 30px rgba(0,0,0,.4);text-align:left;";

    // Header: title, and refusing as a clearly visible link in the corner
    var header = document.createElement("div");
    header.style.cssText =
      "display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin:0 0 8px;";
    var title = document.createElement("strong");
    title.textContent = "Cookies";
    title.style.cssText = "font-size:16px;";
    var refuse = document.createElement("button");
    refuse.type = "button";
    refuse.textContent = "Continue without accepting →";
    refuse.style.cssText =
      "font:inherit;font-size:14px;color:#f3f4f6;background:none;border:0;padding:0;cursor:pointer;" +
      "text-decoration:underline;white-space:nowrap;";
    refuse.addEventListener("click", function () {
      applyChoice({ analytics: false, marketing: false });
    });
    header.appendChild(title);
    header.appendChild(refuse);
    root.appendChild(header);

    var text = document.createElement("p");
    text.style.cssText = "margin:0 0 16px;";
    text.appendChild(
      document.createTextNode(
        "With your consent, we use cookies and similar technologies for analytics and to measure our advertising. You can change your choice at any time with “Cookie settings” at the bottom of the page. ",
      ),
    );
    var policy = document.createElement("a");
    policy.href = POLICY_URL;
    policy.textContent = "Privacy Policy";
    policy.style.cssText = "color:inherit;text-decoration:underline;";
    text.appendChild(policy);
    root.appendChild(text);

    var checkboxes = {};
    var settings = document.createElement("div");
    settings.style.cssText = "display:" + (showSettings ? "block" : "none") + ";margin:0 0 16px;";
    CATEGORIES.forEach(function (category) {
      var label = document.createElement("label");
      label.style.cssText = "display:flex;gap:10px;align-items:flex-start;margin:0 0 10px;cursor:pointer;";
      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = current[category.id]; // never pre-ticked without an earlier choice
      checkbox.style.cssText = "margin-top:3px;width:16px;height:16px;flex:none;";
      checkboxes[category.id] = checkbox;
      var description = document.createElement("span");
      var name = document.createElement("strong");
      name.textContent = category.label;
      description.appendChild(name);
      description.appendChild(document.createTextNode(" — " + category.description));
      label.appendChild(checkbox);
      label.appendChild(description);
      settings.appendChild(label);
    });
    root.appendChild(settings);

    var buttons = document.createElement("div");
    buttons.style.cssText = "display:flex;flex-wrap:wrap;gap:8px;align-items:center;";
    buttons.appendChild(
      button("Accept all", true, function () {
        applyChoice({ analytics: true, marketing: true });
      }),
    );
    var save = button("Save choices", false, function () {
      applyChoice({ analytics: checkboxes.analytics.checked, marketing: checkboxes.marketing.checked });
    });
    var manage = button("Manage preferences", false, function () {
      settings.style.display = "block";
      manage.style.display = "none";
      save.style.display = "";
    });
    save.style.display = showSettings ? "" : "none";
    manage.style.display = showSettings ? "none" : "";
    buttons.appendChild(manage);
    buttons.appendChild(save);
    root.appendChild(buttons);
    return root;
  }

  function showBanner(showSettings) {
    hideBanner();
    banner = buildBanner(showSettings);
    document.body.appendChild(banner);
  }

  function hideBanner() {
    if (banner && banner.parentNode) banner.parentNode.removeChild(banner);
    banner = null;
  }

  // ---- Start ----

  window.nuoConsent = {
    get: readChoice,
    syncPostHog: syncPostHog,
    openSettings: function () {
      showBanner(true);
    },
  };

  document.addEventListener("click", function (event) {
    var target = event.target;
    if (target && target.closest && target.closest("[data-cookie-settings]")) {
      event.preventDefault();
      showBanner(true);
    }
  });

  // Astro view transitions replace <body>: put a banner that is still waiting back
  document.addEventListener("astro:after-swap", function () {
    if (banner && !banner.isConnected) document.body.appendChild(banner);
  });

  function start() {
    var choice = readChoice();
    // Trackers may write their cookies once more while a page unloads (after consent was withdrawn),
    // and visits from before this banner left them too: clear what has no consent on every load
    forgetTrackers(
      CATEGORIES.filter(function (category) {
        return !(choice && choice[category.id]);
      }).map(function (category) {
        return category.id;
      }),
    );
    if (choice) activate(choice);
    else showBanner(false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
