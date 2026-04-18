import { BaseCrudController, type CrudController } from "@/lib/api/controllers/base.controller";
import type { CategoryRow } from "@/lib/api/repositories/categories.repository";
import { categoriesService } from "@/lib/api/services/categories.service";
import { jsonError } from "@/lib/api/views/json";
import {
  categoryFormSchema,
  categoryUpdateSchema,
  type CategoryFormValues,
  type CategoryUpdateValues,
} from "@/lib/schemas/category";

const UNIQUE_MESSAGES: Partial<Record<string, string>> = {
  categories_name_unique: "A category with this name already exists.",
};

export class CategoriesCrudController extends BaseCrudController<
  number,
  CategoryRow,
  CategoryFormValues,
  CategoryUpdateValues
> {
  protected readonly crudService = categoriesService;
  protected readonly createSchema = categoryFormSchema;
  protected readonly updateSchema = categoryUpdateSchema;

  protected parseRouteId(raw: string): number | Response {
    const id = Number.parseInt(raw, 10);
    if (!Number.isFinite(id) || id < 1) {
      return jsonError("Invalid id", 400);
    }
    return id;
  }
}

const categoriesCrudController = new CategoriesCrudController();

export const categoriesController: CrudController = categoriesCrudController.asCrudHandlers();

export const categoriesUniqueConstraintMessages = UNIQUE_MESSAGES;
