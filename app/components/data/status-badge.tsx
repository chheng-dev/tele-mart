import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

const toneToVariant: Record<StatusTone, React.ComponentProps<typeof Badge>["variant"]> = {
  neutral: "muted",
  success: "success",
  warning: "warning",
  danger: "destructive",
  info: "info",
};

type StatusBadgeProps = {
  tone?: StatusTone;
  children: ReactNode;
  className?: string;
};

export function StatusBadge({ tone = "neutral", children, className }: StatusBadgeProps) {
  return (
    <Badge variant={toneToVariant[tone]} className={cn("gap-1.5 px-2 py-0.5", className)}>
      <span
        className={cn(
          "size-1.5 rounded-full",
          tone === "success" && "bg-emerald-500",
          tone === "warning" && "bg-amber-500",
          tone === "danger" && "bg-destructive",
          tone === "info" && "bg-sky-500",
          tone === "neutral" && "bg-muted-foreground/60",
        )}
        aria-hidden
      />
      {children}
    </Badge>
  );
}
