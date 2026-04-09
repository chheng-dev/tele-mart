"use client";

import AvatarDropdown from "@/components/shadcn-space/blocks/dropdown/avatar-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, SearchIcon } from "lucide-react";

export function AdminShellHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-border/80 bg-background px-3 sm:gap-3 md:gap-4 md:px-6">
      <div className="flex items-center gap-2 shrink-0">
        <SidebarTrigger className="-ml-1 shrink-0 cursor-pointer" />
        <SearchIcon className="h-5 w-5" />
      </div>

      <div className="flex shrink-0 items-center gap-2 cursor-pointer">
        <ThemeToggle />
        <Button variant="ghost" size="icon" className="relative shrink-0">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>
        <AvatarDropdown
          trigger={
            <div className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <Avatar className="size-8 cursor-pointer">
                <AvatarImage
                  src="https://images.shadcnspace.com/assets/profiles/user-11.jpg"
                  alt="David McMichael"
                />
                <AvatarFallback>DM</AvatarFallback>
              </Avatar>
            </div>
          }
        />
      </div>
    </header>
  );
}
