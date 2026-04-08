import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const DAYS = [
  { label: "Mon", h: 40, active: false },
  { label: "Tue", h: 72, active: true },
  { label: "Wed", h: 48, active: false },
  { label: "Thu", h: 55, active: false },
  { label: "Fri", h: 62, active: false },
  { label: "Sat", h: 35, active: false },
  { label: "Sun", h: 28, active: false },
];

export function WeeklySalesPlaceholder() {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm">
      <CardHeader className="border-b border-border/80 px-5 pb-4 pt-5">
        <CardTitle className="text-base">Weekly sales</CardTitle>
        <CardDescription>Last 7 days (placeholder)</CardDescription>
        <p className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-semibold tabular-nums">$96,850</span>
          <span className="inline-flex items-center gap-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            +14%
          </span>
        </p>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-4">
        <div className="flex h-36 items-end justify-between gap-2">
          {DAYS.map((d) => (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex h-28 w-full items-end justify-center">
                <div
                  className={
                    d.active
                      ? "w-[85%] rounded-t-md bg-primary shadow-sm"
                      : "w-[85%] rounded-t-md bg-primary/15"
                  }
                  style={{ height: `${d.h}%` }}
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
