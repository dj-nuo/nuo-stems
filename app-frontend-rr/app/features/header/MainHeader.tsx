import React from "react";
import { SidebarTrigger } from "~/components/ui/sidebar";
import { AnimatedThemeToggler } from "~/components/ui/animated-theme-toggler";

export default function MainHeader() {
  return (
    <div className="flex shrink-0 justify-between items-center border-b border-gray-200">
      <SidebarTrigger />
      <AnimatedThemeToggler className="m-2" />
    </div>
  );
}
