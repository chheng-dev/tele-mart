"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SlidersHorizontal } from "lucide-react";
import { ReactNode } from "react";

export type ColumnToggleOption = {
  id: string;
  label: ReactNode;
  locked?: boolean;
};

type DataTableColumnsToggleProps = {
  columns: ColumnToggleOption[];
  visible: Record<string, boolean>;
  onChange: (next: Record<string, boolean>) => void;
  label?: string;
};

export function DataTableColumnsToggle({
  columns,
  visible,
  onChange,
  label = "Columns",
}: DataTableColumnsToggleProps) {
  const toggle = (id: string) => {
    onChange({ ...visible, [id]: !visible[id] });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <SlidersHorizontal className="size-3.5" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 p-2">
        <p className="px-2 pt-1 pb-2 text-xs font-medium text-muted-foreground">Toggle columns</p>
        <ul className="space-y-0.5">
          {columns.map((col) => {
            const checked = visible[col.id] ?? true;
            return (
              <li key={col.id}>
                <label
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground data-[locked=true]:cursor-not-allowed data-[locked=true]:opacity-60"
                  data-locked={col.locked ? "true" : undefined}
                >
                  <Checkbox
                    checked={checked}
                    disabled={col.locked}
                    onCheckedChange={() => {
                      if (!col.locked) toggle(col.id);
                    }}
                  />
                  <span className="truncate">{col.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
