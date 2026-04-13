import { ReactNode } from "react";
import { PageLayout } from "./page-layout";

type ListPageProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  table: ReactNode;
  filters?: ReactNode;
};

export function ListPage({ title, description, actions, table, filters }: ListPageProps) {
  return (
    <PageLayout title={title} description={description} actions={actions}>
      <div className="space-y-4">
        {filters ? <div className="flex flex-wrap gap-2">{filters}</div> : null}
        {table}
      </div>
    </PageLayout>
  );
}
