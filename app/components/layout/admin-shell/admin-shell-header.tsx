"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, User } from "lucide-react";

export function AdminShellHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/80 bg-background pl-12 pr-3 sm:gap-3 md:gap-4 md:px-6 md:pl-6">
      <div className="hidden min-w-0 md:block md:max-w-[200px] lg:max-w-[240px]">
        <h1 className="truncate text-base font-semibold leading-tight tracking-tight">Dashboard</h1>
        <p className="truncate text-[11px] text-muted-foreground">Store overview</p>
      </div>

      <div className="flex min-w-0 flex-1 justify-center px-1 sm:px-3">
        <div className="relative w-full max-w-sm sm:max-w-md">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="h-9 w-full rounded-full border-border/80 bg-muted/40 pl-9 shadow-none focus-visible:ring-2"
            type="search"
          />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
        <Button variant="ghost" size="icon" className="relative shrink-0">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>
        <Avatar className="hidden h-8 w-8 border border-border/60 sm:flex">
          <AvatarImage src="/avatars/me.png" alt="Account" />
          <AvatarFallback className="text-xs">CH</AvatarFallback>
        </Avatar>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
