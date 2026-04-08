import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { ActivityRow } from "./types";

const PLACEHOLDER_ACTIVITY: ActivityRow[] = [
  {
    title: "New order #1042",
    time: "2 min ago",
    tone: "default",
  },
  {
    title: "Inventory sync completed",
    time: "1 hour ago",
    tone: "default",
  },
  {
    title: "Staff login — admin console",
    time: "Yesterday",
    tone: "muted",
  },
];

export function ActivityFeedSkeleton() {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm">
      <div className="divide-y divide-border px-0">
        <Skeleton className="h-14 w-full rounded-none" />
        <Skeleton className="h-14 w-full rounded-none" />
        <Skeleton className="h-14 w-full rounded-none" />
      </div>
    </Card>
  );
}

export function ActivityFeed() {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-sm">
      <ul className="divide-y divide-border">
        {PLACEHOLDER_ACTIVITY.map((row) => (
          <li
            key={row.title}
            className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm"
          >
            <span
              className={
                row.tone === "muted" ? "text-muted-foreground" : "font-medium text-foreground"
              }
            >
              {row.title}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground tabular-nums">{row.time}</span>
          </li>
        ))}
      </ul>
      <div className="border-t bg-muted/20 px-5 py-3 text-center text-xs text-muted-foreground">
        Live feed will connect to your orders and audit log.
      </div>
    </Card>
  );
}
