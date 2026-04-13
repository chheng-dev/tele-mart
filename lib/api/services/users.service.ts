import type { PaginatedList } from "@/lib/api/models/pagination";
import { UsersRepository, type UserRow } from "@/lib/api/repositories/users.repository";
import type { UserFormValues, UserUpdateValues } from "@/lib/schemas/user";
import { BaseService } from "@/lib/api/services/base.service";
import { randomUUID } from "crypto";

function mapInsert(data: UserFormValues): Record<string, unknown> {
  const now = new Date();
  const out: Record<string, unknown> = {
    id: randomUUID(),
    name: data.name,
    email: data.email,
    emailVerified: data.emailVerified,
    createdAt: now,
    updatedAt: now,
    role: data.role,
  };
  if (data.image !== undefined) {
    out.image = data.image;
  }
  return out;
}

function mapUpdate(data: UserUpdateValues): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (data.name !== undefined) out.name = data.name;
  if (data.email !== undefined) out.email = data.email;
  if (data.emailVerified !== undefined) out.emailVerified = data.emailVerified;
  if (data.image !== undefined) out.image = data.image;
  if (data.role !== undefined) out.role = data.role;
  return out;
}

export class UsersService extends BaseService {
  constructor(private readonly repo = new UsersRepository()) {
    super();
  }

  async list(request: Request): Promise<PaginatedList<UserRow> | Response> {
    return this.paginatedListFromRequest(request, (searchParams, page, limit, offset) =>
      this.repo.listPaginated(searchParams, page, limit, offset),
    );
  }

  async getById(id: string): Promise<UserRow> {
    return this.requireRow(await this.repo.findById(id));
  }

  async create(data: UserFormValues): Promise<UserRow> {
    const values = mapInsert(data);
    return this.repo.insert(values);
  }

  async update(id: string, data: UserUpdateValues): Promise<UserRow> {
    const base = mapUpdate(data);
    const patch = { ...base, updatedAt: new Date() };
    return this.requireRow(await this.repo.update(id, patch));
  }

  async deleteById(id: string): Promise<void> {
    this.requireRow(await this.repo.deleteById(id));
  }

  async getByEmail(email: string): Promise<UserRow> {
    return this.requireRow(await this.repo.findByEmail(email), "User not found");
  }
}

export const usersService = new UsersService();
