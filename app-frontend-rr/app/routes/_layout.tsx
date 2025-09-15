import React from "react";
import { NavLink, Outlet } from "react-router";
import { SidebarTrigger } from "~/components/ui/sidebar";
import MainSidebar from "~/features/sidebar/MainSidebar";
import ThemeToggler from "~/features/theme/themeToggler";

export default function GlobalLayout() {
  return (
    <>
      <MainSidebar />
      <main>
        <SidebarTrigger />
        <ThemeToggler />
        <Outlet />
      </main>
    </>
  );
}
