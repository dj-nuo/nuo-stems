import { Outlet } from "react-router";
import MainSidebar from "~/features/sidebar/MainSidebar";
import MainHeader from "~/features/header/MainHeader";

export default function GlobalLayout() {
  const debugBorder = false ? "shadow-[inset_0_0_0_7px_rgba(50,50,100,1)]" : "";
  return (
    <>
      <MainSidebar />
      <main
        className={`flex w-full flex-1 min-h-0 flex-col overflow-hidden ${debugBorder}`}
      >
        <MainHeader />
        <div className="flex-1 min-h-0">
          <Outlet />
        </div>
      </main>
    </>
  );
}
