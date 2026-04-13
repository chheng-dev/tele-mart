import { FormPage } from "@/app/components/layout/form-page";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "../form";

export default function NewCategoryPage() {
  return (
    <FormPage
      title="Create Category"
      description="Fill in the details below to add a new category."
      actions={
        <Button variant="outline" asChild>
          <a href="/admin/categories">Cancel</a>
        </Button>
      }
      form={<CategoryForm />}
    />
  );
}
