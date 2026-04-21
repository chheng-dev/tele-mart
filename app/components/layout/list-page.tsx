import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { adminSurfaceListCardClass } from "./admin-surface";
import { PageLayout, type Breadcrumb } from "./page-layout";

type ListPageProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  badge?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: Breadcrumb[];
  backHref?: string;
  tabs?: ReactNode;
  toolbar?: ReactNode;
  table: ReactNode;
  pagination?: ReactNode;
  className?: string;
  tableClassName?: string;
};

export function ListPage({
  title,
  description,
  eyebrow,
  badge,
  icon,
  actions,
  backHref,
  breadcrumbs,
  tabs,
  toolbar,
  table,
  pagination,
  className,
  tableClassName,
}: ListPageProps) {
  return (
    <PageLayout
      title={title}
      description={description}
      eyebrow={eyebrow}
      badge={badge}
      icon={icon}
      actions={actions}
      backHref={backHref}
      breadcrumbs={breadcrumbs}
      tabs={tabs}
      className={className}
      showHeaderDivider
    >
      <Card className={adminSurfaceListCardClass()}>
        {toolbar ? <div className="border-b border-border/60 bg-card">{toolbar}</div> : null}

        <div className={cn("bg-card", tableClassName)}>{table}</div>

        {pagination ? (
          <div className="border-t border-border/60 bg-muted/10">{pagination}</div>
        ) : null}
      </Card>
    </PageLayout>
  );
}
