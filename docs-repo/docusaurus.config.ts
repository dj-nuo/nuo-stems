import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "NUO-STEMS Docs & Blog",
  tagline: "FAQ, Guides, and more",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://docs.nuo-stems.com",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "nuo-stems", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: [
      "en",
      // "es",
      // "fr"
    ],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          lastVersion: "current",
          versions: {
            current: {
              label: "v4",
              // path: "v4",
            },
            "3": {
              label: "v3",
              path: "v3",
              banner: "none",
            },
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          // // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        // gtag: {
        //   trackingID: "G-YKXDPXJTKV",
        //   anonymizeIP: true,
        // },
        googleTagManager: {
          containerId: "GTM-NC5KC557",
        },
      } satisfies Preset.Options,
    ],
  ],

  headTags: [
    {
      tagName: "script",
      attributes: {},
      innerHTML: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey getNextSurveyStep identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_GQi2GtXQgH6HmWo0fS4WUCtZcnMThVfoYLf1fX7d2ge',{api_host:'https://eu.i.posthog.com', defaults:'2025-11-30'})`,
    },
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/blog-pic.webp",
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    navbar: {
      // title: "NUO-STEMS Docs & Blog",
      logo: {
        alt: "My Site Logo",
        src: "img/icon.png",
      },
      items: [
        {
          type: "docsVersionDropdown",
          // versions: {
          //   current: { label: "v4" },
          //   "3": { label: "v3" },
          // },
          position: "right",
        },
        {
          to: "/docs/intro",
          position: "left",
          label: "Docs NUO-STEMS 4 🚀",
        },
        {
          to: "/docs/v3/",
          position: "left",
          label: "Docs NUO-STEMS 3",
        },
        { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://nuo-stems.com",
          label: "Website",
          position: "right",
        },
        {
          href: "https://www.facebook.com/groups/nuostems",
          label: "Facebook Group",
          position: "right",
        },
        {
          href: "https://discord.gg/dfpk9FbvJE",
          label: "Discord",
          position: "right",
        },
        {
          href: "https://github.com/dj-nuo/nuo-stems",
          label: "GitHub",
          position: "right",
        },
        // {
        //   type: "localeDropdown",
        //   position: "right",
        // },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Facebook Group",
              href: "https://www.facebook.com/groups/nuostems",
            },
            {
              label: "Discord",
              href: "https://discord.gg/dfpk9FbvJE",
            },
            {
              label: "Website",
              href: "https://nuo-stems.com",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/dj-nuo/nuo-stems",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} NUO-STEMS. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    zoom: {
      selector: ".markdown > img, .markdown > picture",
      background: {
        light: "rgb(255, 255, 255)",
        dark: "rgb(50, 50, 50)",
      },
      config: {
        // options you can specify via https://github.com/francoischalifour/medium-zoom#usage
      },
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    "docusaurus-plugin-image-zoom", // can also just be 'image-zoom'
    "docusaurus-plugin-llms",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // Options for the search plugin
        // See https://github.com/easyops-cn/docusaurus-search-local for all options
        hashed: true,
        language: ["en"],
        highlightSearchTermsOnTargetPage: true,
        // explicitSearchResultPath: true,
      },
    ],
  ],
};

export default config;
