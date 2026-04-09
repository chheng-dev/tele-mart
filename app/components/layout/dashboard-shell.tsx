"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar";
import { AdminShellHeader } from "./admin-shell/admin-shell-header";
import { AdminShellSidebar } from "./admin-shell/admin-shell-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

function DashboardShellLayout({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  const { setOpenMobile } = useSidebar();

  return (
    <>
      <Sidebar collapsible="offcanvas">
        <SidebarContent className="gap-0 p-0">
          <AdminShellSidebar pathname={pathname} onNavigate={() => setOpenMobile(false)} />
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <AdminShellHeader />
        <div className="min-h-[calc(100vh-3.5rem)] flex-1 bg-muted/30 px-4 py-5 md:px-6 md:py-7">
          {children}
        </div>
      </SidebarInset>
    </>
  );
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <DashboardShellLayout pathname={pathname}>{children}</DashboardShellLayout>
    </SidebarProvider>
  );
}
