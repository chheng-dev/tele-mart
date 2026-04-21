import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { adminSurfaceCardClass } from "./admin-surface";

type AdminEmptyStateProps = {
  title: string;
  description?: ReactNode;
  className?: string;
  minHeightClassName?: string;
};

export function AdminEmptyState({
  title,
  description,
  className,
  minHeightClassName = "min-h-[240px]",
}: AdminEmptyStateProps) {
  return (
    <Card
      className={cn(
        adminSurfaceCardClass,
        "flex flex-col items-center justify-center gap-1 p-8 text-center shadow-sm",
        minHeightClassName,
        className,
      )}
    >
      <p className="text-sm font-medium">{title}</p>
      {description ? (
        typeof description === "string" ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : (
          <div className="text-sm text-muted-foreground">{description}</div>
        )
      ) : null}
    </Card>
  );
}
