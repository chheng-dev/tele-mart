"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="flex h-full flex-col border-r border-border/80 bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <span className="font-semibold text-lg tracking-tight">TeleMart</span>
      </div>

      <ScrollArea className="flex-1">
        <AdminShellNav pathname={pathname} onNavigate={onNavigate} />
      </ScrollArea>

      <div className="flex items-center gap-3 border-t px-4 py-3">
        <Avatar className="h-9 w-9 border border-border/60">
          <AvatarImage src="/avatars/me.png" alt="User" />
          <AvatarFallback>CH</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex flex-col">
          <span className="truncate text-sm font-medium leading-none">Chungchheng Admin</span>
          <span className="truncate text-xs text-muted-foreground">chheng@vtenh.com</span>
        </div>
      </div>
    </div>
  );
}
