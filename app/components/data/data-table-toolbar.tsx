import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type DataTableToolbarProps = {
  start?: ReactNode;
  end?: ReactNode;
  className?: string;
};

export function DataTableToolbar({ start, end, className }: DataTableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">{start}</div>
      <div className="flex flex-wrap items-center gap-2">{end}</div>
    </div>
  );
}
