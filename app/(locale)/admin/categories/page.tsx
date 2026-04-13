import { ListPage } from "@/app/components/layout/list-page";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  return (
    <ListPage
      title="Categories"
      description="Manage the categories in your catalog."
      actions={
        <Button asChild>
          <a href="/admin/categories/new">Add category</a>
        </Button>
      }
      filters={null}
      table={null}
    />
  );
}
