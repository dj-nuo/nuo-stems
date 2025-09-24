import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

import iconNuoStems from "./icon.png";

import { NavLink } from "react-router";

// Presentational (stateless)
export default function MainSidebarView(params: {
  menuItems: {
    title: string;
    url: string;
    icon: React.ElementType;
  }[];
  appVersion?: string;
  isLoadingAppVersion: boolean;
  isErrorAppVersion: boolean;
  sidebarOpen: boolean;
}) {
  return (
    <Sidebar collapsible="icon" variant="floating" className="pt-6">
      <SidebarHeader>
        <div className="flex items-center justify-start gap-2 z-0">
          <img
            src={iconNuoStems}
            alt="App Icon"
            className="w-7 h-7 transition-all duration-1000"
          />
          <span
            className={`font-semibold whitespace-nowrap transition-opacity duration-100 ${
              params.sidebarOpen
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!params.sidebarOpen}
          >
            NUO-STEMS 4
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {params.menuItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <NavLink
                    to={item.url}
                    className={({ isActive }) =>
                      isActive ? "text-blue-500" : ""
                    }
                  >
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <span>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </span>
                    </SidebarMenuButton>
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="text-[10px] text-gray-400 flex w-full justify-center">
          {params.isLoadingAppVersion
            ? "Loading..."
            : params.isErrorAppVersion
            ? "Error loading app version"
            : params.appVersion}
        </span>
      </SidebarFooter>
    </Sidebar>
  );
}
