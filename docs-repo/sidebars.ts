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
    "stems-separation-quality",
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
        "traktor-utilities/change-stems-colors",
      ],
    },
    {
      type: "category",
      label: "Settings",
      items: ["settings/general", "settings/advanced", "settings/traktor-pro"],
    },
    {
      type: "category",
      label: "Tips & Workflows",
      items: [
        "tips-and-workflows/migrating-from-ns3",
        "tips-and-workflows/gaming-pc-to-dj-laptop",
        "tips-and-workflows/only-stem-m4a-no-originals",
        "tips-and-workflows/music-tagging-approach",
        "tips-and-workflows/stems-video-tutorials",
      ],
    },
    "faq/index",
    "roadmap/index",
    "changelog/index",
    "contact-support/index",
  ],
};

export default sidebars;
