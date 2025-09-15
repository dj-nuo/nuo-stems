import { SidebarProvider } from "~/components/ui/sidebar";

export default function AllProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
