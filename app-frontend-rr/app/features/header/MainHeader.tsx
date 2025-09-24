import React from "react";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { AnimatedThemeToggler } from "~/components/magicui/animated-theme-toggler";

export default function MainHeader() {
  return (
    <div className="flex shrink-0 justify-between items-center px-4 bg-white dark:bg-gray-800 shadow-xs">
      <SidebarTrigger />
      <AnimatedThemeToggler className="m-2" />
    </div>
  );
}
