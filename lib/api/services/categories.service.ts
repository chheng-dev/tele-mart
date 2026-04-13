import type { PaginatedList } from "@/lib/api/models/pagination";
import {
  CategoriesRepository,
  type CategoryRow,
} from "@/lib/api/repositories/categories.repository";
import type { CategoryFormValues, CategoryUpdateValues } from "@/lib/schemas/category";
import { BaseService } from "@/lib/api/services/base.service";

function mapInsert(data: CategoryFormValues): Record<string, unknown> {
  return {
    name: data.name,
    description: data.description.trim() === "" ? null : data.description,
  };
}

function mapUpdate(data: CategoryUpdateValues): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (data.name !== undefined) out.name = data.name;
  if (data.description !== undefined) {
    out.description = data.description.trim() === "" ? null : data.description;
  }
  return out;
}

export class CategoriesService extends BaseService {
  constructor(private readonly repo = new CategoriesRepository()) {
    super();
  }

  async list(request: Request): Promise<PaginatedList<CategoryRow> | Response> {
    return this.paginatedListFromRequest(request, (searchParams, page, limit, offset) =>
      this.repo.listPaginated(searchParams, page, limit, offset),
    );
  }

  async getById(id: number): Promise<CategoryRow> {
    return this.requireRow(await this.repo.findById(id));
  }

  async create(data: CategoryFormValues): Promise<CategoryRow> {
    return this.repo.insert(mapInsert(data));
  }

  async update(id: number, data: CategoryUpdateValues): Promise<CategoryRow> {
    const base = mapUpdate(data);
    const patch = { ...base, updatedAt: new Date() };
    return this.requireRow(await this.repo.update(id, patch));
  }

  async deleteById(id: number): Promise<void> {
    this.requireRow(await this.repo.deleteById(id));
  }
}

export const categoriesService = new CategoriesService();
