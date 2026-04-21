import { FormPage } from "@/app/components/layout/form-page";
import { Button } from "@/components/ui/button";
import { CategoriesRepository } from "@/lib/api/repositories/categories.repository";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CategoryForm } from "../../form";

type EditCategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const n = Number.parseInt(id, 10);
  if (!Number.isFinite(n)) notFound();

  const row = await new CategoriesRepository().findById(n);
  if (!row) notFound();

  return (
    <FormPage
      title="Edit category"
      description="Update the name or description for this category."
      backHref="/admin/categories"
      breadcrumbs={[{ label: "Categories", href: "/admin/categories" }, { label: row.name }]}
      actions={
        <Button variant="outline" asChild>
          <Link href="/admin/categories">Cancel</Link>
        </Button>
      }
      form={
        <CategoryForm
          mode="edit"
          categoryId={row.id}
          defaultValues={{
            name: row.name,
            description: row.description ?? "",
          }}
        />
      }
    />
  );
}
