import { withApiErrorHandling } from "@/lib/api/http";
import {
  categoriesCrud,
  categoriesUniqueConstraintMessages,
} from "@/lib/api/resources/categories.crud";

const categoryCrudOpts = {
  uniqueConstraintMessages: categoriesUniqueConstraintMessages,
};

export const GET = withApiErrorHandling(categoriesCrud.list, categoryCrudOpts);
export const POST = withApiErrorHandling(categoriesCrud.create, categoryCrudOpts);
