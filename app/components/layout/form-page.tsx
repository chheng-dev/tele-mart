import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import {
  adminSurfaceFormCardClass,
  adminSurfaceFormCardContentClass,
  adminSurfaceInfoCardClass,
} from "./admin-surface";
import { PageLayout, type Breadcrumb, type PageLayoutMaxWidth } from "./page-layout";

type FormPageProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  badge?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  backHref?: string;
  breadcrumbs?: Breadcrumb[];
  /** Optional left column (tips / context) on `md+`; form stays on the right. */
  sidePanel?: ReactNode;
  /**
   * Tailwind grid column classes for `md+` when `sidePanel` is set.
   * Default: fixed 280px sidebar + fluid form column.
   */
  sidePanelGridClassName?: string;
  /**
   * When there is no `sidePanel`, keeps the form fields in a readable column inside the card.
   * Ignored when `sidePanel` is set so the main column can use full width.
   */
  constrainFormWidth?: boolean;
  form: ReactNode;
  maxWidth?: PageLayoutMaxWidth;
  sticky?: boolean;
  showHeaderDivider?: boolean;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  cardClassName?: string;
  sidePanelClassName?: string;
};

export function FormPage({
  title,
  description,
  eyebrow,
  badge,
  icon,
  actions,
  footer,
  backHref,
  breadcrumbs,
  sidePanel,
  sidePanelGridClassName,
  constrainFormWidth = true,
  form,
  maxWidth,
  sticky = false,
  showHeaderDivider = true,
  className,
  headerClassName,
  contentClassName,
  cardClassName,
  sidePanelClassName,
}: FormPageProps) {
  const resolvedMaxWidth = maxWidth ?? (sidePanel ? "lg" : "md");
  const formBody =
    constrainFormWidth && !sidePanel ? <div className="mx-auto w-full">{form}</div> : form;

  return (
    <PageLayout
      title={title}
      description={description}
      eyebrow={eyebrow}
      badge={badge}
      icon={icon}
      actions={actions}
      footer={footer}
      backHref={backHref}
      breadcrumbs={breadcrumbs}
      maxWidth={resolvedMaxWidth}
      sticky={sticky}
      showHeaderDivider={showHeaderDivider}
      className={className}
      headerClassName={headerClassName}
      contentClassName={contentClassName}
    >
      {sidePanel ? (
        <div
          className={cn(
            "grid grid-cols-1 gap-4 md:grid-cols-[280px_1fr] md:items-start md:gap-6",
            sidePanelGridClassName,
          )}
        >
          <Card className={adminSurfaceInfoCardClass(sidePanelClassName)}>
            <CardContent className={adminSurfaceFormCardContentClass}>{sidePanel}</CardContent>
          </Card>
          <Card className={adminSurfaceFormCardClass(cardClassName)}>
            <CardContent className={adminSurfaceFormCardContentClass}>{formBody}</CardContent>
          </Card>
        </div>
      ) : (
        <Card className={adminSurfaceFormCardClass(cardClassName)}>
          <CardContent className={adminSurfaceFormCardContentClass}>{formBody}</CardContent>
        </Card>
      )}
    </PageLayout>
  );
}
