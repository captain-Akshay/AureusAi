import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { ModalProvider } from "@/components/ui/animated-modal";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <ModalProvider>
        <main className="w-full dark:bg-gradient-to-b dark:from-background dark:via-black dark:to-background bg-gradient-to-b from-white via-purple-400 to-white">
          <SidebarTrigger />
          {children}
        </main>
      </ModalProvider>
    </SidebarProvider>
  );
}
