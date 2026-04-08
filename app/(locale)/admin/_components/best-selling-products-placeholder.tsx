import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function BestSellingProductsPlaceholder() {
  return (
    <Card className="relative gap-0 overflow-hidden border-primary/20 py-0 shadow-sm">
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/15 via-primary/5 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-24 w-24 rounded-full bg-chart-4/20 blur-xl"
        aria-hidden
      />
      <CardHeader className="relative border-b border-primary/10 px-5 pb-4 pt-5">
        <div className="flex items-start gap-2">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <CardTitle className="text-base text-foreground">Best selling products</CardTitle>
            <CardDescription>Top SKUs by revenue (placeholder)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-3 px-5 pb-5 pt-4">
        <div className="flex gap-2">
          {[36, 58, 32, 72, 44].map((px, i) => (
            <div key={i} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <div className="flex h-20 w-full items-end justify-center">
                <div
                  className="w-[70%] rounded-t-md bg-primary/80 dark:bg-primary/70"
                  style={{ height: `${px}px` }}
                />
              </div>
              <span className="text-[10px] font-medium text-muted-foreground">P{i + 1}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] text-muted-foreground">
          Hook up product analytics to replace this preview.
        </p>
      </CardContent>
    </Card>
  );
}
