import { withApiErrorHandling } from "@/lib/api/http";
import {
  categoriesCrud,
  categoriesUniqueConstraintMessages,
} from "@/lib/api/resources/categories.crud";

const categoryCrudOpts = {
  uniqueConstraintMessages: categoriesUniqueConstraintMessages,
};

export const GET = withApiErrorHandling(categoriesCrud.get, categoryCrudOpts);
export const PATCH = withApiErrorHandling(categoriesCrud.update, categoryCrudOpts);
export const DELETE = withApiErrorHandling(categoriesCrud.delete, categoryCrudOpts);
