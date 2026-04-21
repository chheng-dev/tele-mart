import { AdminEmptyState } from "@/app/components/layout/admin-empty-state";
import { PageLayout } from "@/app/components/layout/page-layout";

export default function AdminUsersPage() {
  return (
    <PageLayout title="Users" description="Manage staff and customer accounts." showHeaderDivider>
      <AdminEmptyState title="Nothing here yet" description="Users management is coming soon." />
    </PageLayout>
  );
}
