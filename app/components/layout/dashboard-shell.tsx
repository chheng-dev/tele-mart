"use client";

import { authClient } from "@/lib/auth-client";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { AdminShellHeader } from "./admin-shell/admin-shell-header";
import { AdminShellMobileDrawer } from "./admin-shell/admin-shell-mobile-drawer";
import { AdminShellSidebar } from "./admin-shell/admin-shell-sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
}

/** Admin chrome (sidebar + top bar). Page bodies should use `PageLayout` / `FormPage` in the main slot — no paid block registry required. */
export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleNavigate = () => {
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    setMobileOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <div className="min-h-screen bg-background md:grid md:grid-cols-[16rem_1fr] lg:grid-cols-[18rem_1fr]">
      <aside className="hidden md:block">
        <div className="sticky top-0 h-screen">
          <AdminShellSidebar pathname={pathname} onSignOut={handleSignOut} />
        </div>
      </aside>

      <AdminShellMobileDrawer open={mobileOpen} onOpenChange={setMobileOpen}>
        <AdminShellSidebar
          pathname={pathname}
          onNavigate={handleNavigate}
          onSignOut={handleSignOut}
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
