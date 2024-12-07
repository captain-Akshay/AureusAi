"use client";
import LogoDark from "@/assets/logo-dark";
import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "../ui/sidebar";

function CompanyHeader() {
  const router = useRouter();
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      onClick={() => router.push("/dashboard")}
    >
      <div className="flexsize-15 items-center justify-center">
        <LogoDark width={"32px"} height={"32px"} />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">Aureus Ai</span>
      </div>
    </SidebarMenuButton>
  );
}

export default CompanyHeader;
