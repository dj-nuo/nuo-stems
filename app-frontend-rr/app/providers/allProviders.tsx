import { SidebarProvider } from "~/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client
const queryClient = new QueryClient();

export default function AllProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const debugBorder = false
    ? "shadow-[inset_0_0_0_3px_rgba(100,100,100,1)]"
    : "";

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider className={`h-full w-full ${debugBorder}`}>
        {children}
      </SidebarProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
