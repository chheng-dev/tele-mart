"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type DataTableTabItem = {
  id: string;
  label: ReactNode;
  count?: number;
};

type DataTableTabsProps = {
  tabs: DataTableTabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export function DataTableTabs({ tabs, value, onChange, className }: DataTableTabsProps) {
  return (
    <Tabs value={value} onValueChange={onChange} className={cn("w-full", className)}>
      <TabsList className="h-8 w-fit">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id} className="gap-1.5 px-2.5 py-1 text-xs">
            <span>{tab.label}</span>
            {typeof tab.count === "number" ? (
              <span
                className={cn(
                  "inline-flex min-w-5 items-center justify-center rounded-full bg-muted-foreground/15 px-1 text-[10px] font-medium tabular-nums text-muted-foreground",
                  value === tab.id && "bg-foreground/10 text-foreground",
                )}
              >
                {tab.count}
              </span>
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
