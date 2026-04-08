import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Share2 } from "lucide-react";

export function CampaignPerformancePlaceholder() {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm">
      <CardHeader className="border-b border-border/80 px-5 pb-4 pt-5">
        <CardTitle className="text-base">Campaign performance</CardTitle>
        <CardDescription>Social channels (placeholder)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5 pt-4">
        <div className="flex items-center justify-between gap-3 rounded-xl border bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-pink-500/20 to-purple-500/20 text-pink-600 dark:text-pink-400">
              <Share2 className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium leading-tight">Social campaign</p>
              <p className="text-xs text-muted-foreground">523 new leads</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Running
          </span>
        </div>
        <p className="text-center text-[11px] text-muted-foreground">
          Connect Meta / ad APIs to show live campaign metrics.
        </p>
      </CardContent>
    </Card>
  );
}
