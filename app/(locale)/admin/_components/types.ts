import type { LucideIcon } from "lucide-react";

export type TrendVariant = "up" | "down" | "neutral";

export type MetricStat = {
  label: string;
  value: string;
  trendLabel: string;
  variant: TrendVariant;
  icon: LucideIcon;
};

export type ActivityRow = {
  title: string;
  time: string;
  tone: "default" | "muted";
};
