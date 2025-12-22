import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    "intro",
    "demo-trial",
    {
      type: "category",
      label: "Getting Started",
      items: [
        "getting-started/modes-overview",
        "getting-started/native-traktor-pro-4",
        "getting-started/legacy-traktor",
        "getting-started/daw-non-traktor",
      ],
    },
    {
      type: "category",
      label: "Traktor Utilities",
      items: [
        "traktor-utilities/overview",
        "traktor-utilities/migrate-stem-m4a-to-tp4",
        "traktor-utilities/extract-individual-stems-from-stem-m4a",
      ],
    },
    {
      type: "category",
      label: "Settings",
      items: ["settings/general", "settings/advanced", "settings/traktor-pro"],
    },
    "faq/index",
    "roadmap/index",
    "changelog/index",
  ],
};

export default sidebars;
