"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LogOut, MoreVertical, Settings } from "lucide-react";
import Link from "next/link";
import { AdminShellNav } from "./admin-shell-nav";

export function AdminShellSidebar({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full flex-col border-r border-border/80 bg-card shadow-[inset_-1px_0_0_0_hsl(var(--border)/0.35)]">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border/60 px-4">
        <div
          className="size-8 shrink-0 rounded-full bg-foreground shadow-sm ring-1 ring-border/40 dark:ring-border/25"
          aria-hidden
        />
        <span className="truncate font-bold text-base tracking-tight capitalize">Telemart</span>
      </div>

      <ScrollArea className="min-h-0 flex-1">
        <AdminShellNav pathname={pathname} onNavigate={onNavigate} />
      </ScrollArea>

      <div className="shrink-0 space-y-3 border-t border-border/60 bg-muted/15 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-border/50 bg-card/90 p-1.5 pr-1 shadow-sm">
          <Avatar className="size-9 shrink-0 border border-border/60 shadow-sm">
            <AvatarImage src="/avatars/me.png" alt="" />
            <AvatarFallback className="text-xs font-medium">CH</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium leading-tight">Chungchheng Admin</p>
            <p className="truncate text-xs text-muted-foreground leading-tight">chheng@vtenh.com</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0 text-muted-foreground hover:text-foreground"
                aria-label="Account menu"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-52" align="end" side="top" sideOffset={8}>
              <DropdownMenuItem asChild>
                <Link href="/admin/settings" className="gap-2" onClick={onNavigate}>
                  <Settings className="size-4 opacity-80" />
                  Profile & settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" className="gap-2" asChild>
                <Link href="/" className="gap-2" onClick={onNavigate}>
                  <LogOut className="size-4 opacity-80" />
                  Sign out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
