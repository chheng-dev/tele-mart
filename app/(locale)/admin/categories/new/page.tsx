import { FormPage } from "@/app/components/layout/form-page";

import { CategoryForm } from "../form";

export default function NewCategoryPage() {
  return (
    <FormPage
      title="Create Category"
      description="Fill in the details below to add a new category."
      backHref="/admin/categories"
      breadcrumbs={[{ label: "Categories", href: "/admin/categories" }, { label: "New" }]}
      form={<CategoryForm />}
    />
  );
}
