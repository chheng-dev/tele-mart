import { Suspense } from "react";
import { ActivityFeed, ActivityFeedSkeleton } from "./_components/activity-feed";
import { BestSellingProductsPlaceholder } from "./_components/best-selling-products-placeholder";
import { CampaignPerformancePlaceholder } from "./_components/campaign-performance-placeholder";
import { DashboardPageHeader } from "./_components/dashboard-page-header";
import { SalesReportPlaceholder } from "./_components/sales-report-placeholder";
import { StatsGrid } from "./_components/stats-grid";
import { WeeklySalesPlaceholder } from "./_components/weekly-sales-placeholder";

export default async function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-7 lg:space-y-8">
      <DashboardPageHeader />
      <StatsGrid />
      <div className="grid gap-6 xl:grid-cols-[2fr_1fr] xl:items-stretch">
        <SalesReportPlaceholder />
        <WeeklySalesPlaceholder />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <CampaignPerformancePlaceholder />
        <BestSellingProductsPlaceholder />
      </div>
      <section className="space-y-3">
        <h3 className="text-sm font-semibold tracking-tight">Latest activity</h3>
        <Suspense fallback={<ActivityFeedSkeleton />}>
          <ActivityFeed />
        </Suspense>
      </section>
    </div>
  );
}
