import React from "react";
import { SidebarTrigger } from "~/components/ui/sidebar";
import ThemeToggler from "../theme/themeToggler";

export default function MainHeader() {
  return (
    <div className="flex shrink-0 justify-between items-center border-b border-gray-200">
      <SidebarTrigger />
      <ThemeToggler />
    </div>
  );
}
