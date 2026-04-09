"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { AdminShellNav } from "./admin-shell-nav";

export function AdminShellSidebar({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col border-r border-border bg-background">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-[10px] font-semibold leading-none text-background">
          TM
        </span>
        <span className="font-semibold text-lg tracking-tight text-foreground">TeleMart</span>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <AdminShellNav pathname={pathname} onNavigate={onNavigate} />
      </ScrollArea>
    </div>
  );
}
