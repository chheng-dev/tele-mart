import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import type { MetricStat } from "./types";

export function MetricStatCard({ label, value, trendLabel, variant, icon: Icon }: MetricStat) {
  const TrendIcon = variant === "up" ? TrendingUp : variant === "down" ? TrendingDown : Minus;

  const trendClass =
    variant === "up"
      ? "text-emerald-600 dark:text-emerald-400"
      : variant === "down"
        ? "text-amber-600 dark:text-amber-500"
        : "text-muted-foreground";

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 pt-5 px-5">
        <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted/70 text-muted-foreground">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </CardHeader>
      <CardContent className="space-y-1 px-5 pb-5">
        <p className="text-2xl font-semibold tabular-nums tracking-tight">{value}</p>
        <p className={cn("flex items-center gap-1.5 text-xs", trendClass)}>
          <TrendIcon className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>{trendLabel}</span>
        </p>
        <p className="text-[11px] text-muted-foreground">Last 7 days</p>
      </CardContent>
    </Card>
  );
}
