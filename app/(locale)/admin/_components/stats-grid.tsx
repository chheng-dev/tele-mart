import { CardDescription } from "@/components/ui/card";
import { DollarSign, Receipt, ShoppingCart, TrendingUp } from "lucide-react";
import { MetricStatCard } from "./metric-stat-card";
import type { MetricStat } from "./types";

const STATS: MetricStat[] = [
  {
    label: "Orders",
    value: "5,868",
    trendLabel: "+18% from prior week",
    variant: "up",
    icon: ShoppingCart,
  },
  {
    label: "Sales",
    value: "$96,850",
    trendLabel: "+12% from prior week",
    variant: "up",
    icon: DollarSign,
  },
  {
    label: "Profit",
    value: "$82,906",
    trendLabel: "+9% from prior week",
    variant: "up",
    icon: TrendingUp,
  },
  {
    label: "Expense",
    value: "$14,653",
    trendLabel: "−5% from prior week",
    variant: "down",
    icon: Receipt,
  },
];

export function StatsGrid() {
  return (
    <section className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-foreground">Key metrics</h3>
        <CardDescription className="mt-0.5">
          Snapshot for the last 7 days (placeholder values).
        </CardDescription>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat) => (
          <MetricStatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
