import { useSidebar } from "~/components/ui/sidebar";

import { Home, Settings, Rows3, ToolCase, Disc3 } from "lucide-react";
import { useAppVersion } from "~/lib/rpc/fetchers";
import MainSidebarView from "./MainSidebarView";

// Menu items.
const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Convert Queue",
    url: "/queue",
    icon: Rows3,
  },
  {
    title: "Traktor Pro 4",
    url: "/traktor-pro-4",
    icon: Disc3,
  },
  {
    title: "Traktor Utilities",
    url: "/traktor-utilities",
    icon: ToolCase,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

// Container (keeps data close to use-site)
export default function MainSidebar() {
  const { data, isLoading, isError } = useAppVersion();
  const { open } = useSidebar();

  return (
    <MainSidebarView
      menuItems={menuItems}
      appVersion={data}
      isLoadingAppVersion={isLoading}
      isErrorAppVersion={isError}
      sidebarOpen={open}
    />
  );
}
