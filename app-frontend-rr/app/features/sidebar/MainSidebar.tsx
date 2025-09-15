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
  useSidebar,
} from "~/components/ui/sidebar";

import iconNuoStems from "./icon.png";

import { Home, Settings, Rows3, ToolCase, Disc3 } from "lucide-react";
import { NavLink } from "react-router";
import { getAppVersion } from "~/lib/rpc/fetchers";
import { useEffect, useState } from "react";

// Menu items.
const items = [
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

export default function MainSidebar() {
  const { open } = useSidebar();
  const [appVersion, setAppVersion] = useState(null);
  useEffect(() => {
    getAppVersion().then((version) => {
      setAppVersion(version);
    });
  }, []);

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <div className="flex items-center justify-start gap-2 z-0">
          <img src={iconNuoStems} alt="App Icon" className="w-8 h-8" />
          <span
            className={`font-semibold whitespace-nowrap transition-opacity duration-100 ${
              open ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!open}
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
              {items.map((item) => (
                <>
                  <SidebarMenuItem key={item.title}>
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
                </>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <span className="text-[10px] text-gray-400 flex w-full justify-center">
          {appVersion}
        </span>
      </SidebarFooter>
    </Sidebar>
  );
}
