import { useSidebar } from "~/components/ui/sidebar";

import { useAppVersion } from "~/lib/rpc/fetchers";
import MainSidebarView from "./MainSidebarView";
import { menuItems } from "./menuItems";

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
