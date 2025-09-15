import React from "react";
import { NavLink, Outlet } from "react-router";
import ThemeToggler from "~/features/theme/themeToggler";

export default function GlobalLayout() {
  const activeClasses = "text-blue-500 bg-red-500";
  const inactiveClasses = "";
  return (
    <>
      <div>Global Layout</div>
      <ThemeToggler />
      <Outlet />
    </>
  );
}
