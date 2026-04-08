import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

/** Static SVG placeholder — swap for a real chart when you add a chart library. */
export function SalesReportPlaceholder() {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm">
      <CardHeader className="border-b border-border/80 px-5 pb-4 pt-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <CardTitle className="text-base">Sales report</CardTitle>
            <CardDescription>Revenue vs expenses (placeholder)</CardDescription>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border bg-muted/30 px-3 py-2">
            <p className="text-xs text-muted-foreground">Sales this year</p>
            <p className="flex items-center gap-1 text-lg font-semibold tabular-nums">
              $563,489
              <TrendingUp className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </p>
          </div>
          <div className="rounded-lg border bg-muted/30 px-3 py-2">
            <p className="text-xs text-muted-foreground">Sales last year</p>
            <p className="flex items-center gap-1 text-lg font-semibold tabular-nums">
              $438,928
              <TrendingDown className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-5 pt-4">
        <div className="aspect-16/7 w-full overflow-hidden rounded-lg border bg-muted/20">
          <svg viewBox="0 0 400 140" className="h-full w-full text-primary/80" aria-hidden>
            <defs>
              <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
              points="0,100 40,85 80,95 120,60 160,70 200,45 240,55 280,35 320,40 360,25 400,30"
            />
            <polygon
              fill="url(#salesFill)"
              points="0,100 40,85 80,95 120,60 160,70 200,45 240,55 280,35 320,40 360,25 400,30 400,140 0,140"
            />
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              strokeDasharray="4 4"
              points="0,115 40,105 80,110 120,90 160,95 200,80 240,85 280,75 320,78 360,70 400,72"
            />
          </svg>
        </div>
        <p className="mt-2 text-center text-[11px] text-muted-foreground">
          Jan – Dec (illustrative curve)
        </p>
      </CardContent>
    </Card>
  );
}
