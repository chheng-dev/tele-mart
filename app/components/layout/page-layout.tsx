import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export type Breadcrumb = { label: ReactNode; href?: string };

export type PageLayoutMaxWidth = "md" | "lg" | "xl" | "2xl" | "full";

type MaxWidth = PageLayoutMaxWidth;

type PageLayoutProps = {
  title: string;
  description?: ReactNode;
  eyebrow?: ReactNode;
  /** Optional icon shown in a primary-tinted circle to the left of the title block. */
  icon?: ReactNode;
  badge?: ReactNode;
  breadcrumbs?: Breadcrumb[];
  backHref?: string;
  actions?: ReactNode;
  tabs?: ReactNode;
  footer?: ReactNode;
  sticky?: boolean;
  /** Adds a subtle rule between the header block and page content. */
  showHeaderDivider?: boolean;
  maxWidth?: MaxWidth;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  children: ReactNode;
};

export function PageLayout({
  actions,
  title,
  breadcrumbs,
  footer,
  className,
  contentClassName,
  children,
}: PageLayoutProps) {
  const crumbs = breadcrumbs ?? [];

  return (
    <div className={cn("mx-auto flex w-full flex-col gap-4 pb-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          {crumbs.length > 0 ? (
            <Breadcrumb>
              <BreadcrumbList>
                {crumbs.map((crumb, index) => {
                  const isLast = index === crumbs.length - 1;
                  return (
                    <React.Fragment key={`${index}-${String(crumb.label)}`}>
                      <BreadcrumbItem>
                        {crumb.href && !isLast ? (
                          <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                        ) : (
                          <span className="text-muted-foreground">{crumb.label}</span>
                        )}
                      </BreadcrumbItem>
                      {!isLast ? <BreadcrumbSeparator /> : null}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          ) : null}
          <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        {actions ? <div className="flex items-start gap-2">{actions}</div> : null}
      </div>

      <div className={cn("min-w-0 flex-1", contentClassName)}>{children}</div>

      {footer ? (
        <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-border/50 pt-3">
          {footer}
        </footer>
      ) : null}
    </div>
  );
}
