export function DashboardPageHeader() {
  return (
    <header className="space-y-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">CRM overview</h2>
        <p className="text-xs font-medium text-muted-foreground tabular-nums">
          {new Intl.DateTimeFormat("en", {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          }).format(new Date())}
        </p>
      </div>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Revenue, orders, and operations at a glance. Replace placeholders with
        live queries when your analytics layer is connected.
      </p>
    </header>
  );
}
