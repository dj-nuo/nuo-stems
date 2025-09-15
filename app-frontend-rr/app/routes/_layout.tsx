import React from "react";
import { NavLink, Outlet } from "react-router";

export default function GlobalLayout() {
  const activeClasses = "text-blue-500 bg-red-500";
  const inactiveClasses = "";
  return (
    <>
      <div>Global Layout</div>
      <Outlet />
    </>
  );
}
