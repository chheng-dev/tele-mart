"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AdminShellHeader } from "./admin-shell/admin-shell-header";
import { AdminShellMobileDrawer } from "./admin-shell/admin-shell-mobile-drawer";
import { AdminShellSidebar } from "./admin-shell/admin-shell-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-[16rem_1fr] lg:grid-cols-[18rem_1fr]">
      <aside className="hidden md:block">
        <div className="sticky top-0 h-screen">
          <AdminShellSidebar pathname={pathname} />
        </div>
      </aside>

      <AdminShellMobileDrawer open={mobileOpen} onOpenChange={setMobileOpen}>
        <AdminShellSidebar
          pathname={pathname}
          onNavigate={() => setMobileOpen(false)}
        />
      </AdminShellMobileDrawer>

      <div className="flex min-w-0 flex-1 flex-col">
        <AdminShellHeader />

        <main className="min-h-[calc(100vh-3.5rem)] flex-1 bg-muted/30 px-4 py-5 md:px-6 md:py-7">
          {children}
        </main>
      </div>
    </div>
  );
}
