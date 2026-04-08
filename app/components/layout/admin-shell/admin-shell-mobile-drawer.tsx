"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function AdminShellMobileDrawer({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="fixed left-2 top-2 z-40 md:hidden">
          <PanelLeft className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[min(100vw,20rem)] p-0 sm:max-w-sm">
        {children}
      </SheetContent>
    </Sheet>
  );
}
