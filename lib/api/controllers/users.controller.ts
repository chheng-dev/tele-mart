import { BaseCrudController, type CrudController } from "@/lib/api/controllers/base.controller";
import type { ApiHandler } from "@/lib/api/http";
import type { UserRow } from "@/lib/api/repositories/users.repository";
import { usersService } from "@/lib/api/services/users.service";
import { jsonError, jsonOk } from "@/lib/api/views/json";
import {
  userFormSchema,
  userUpdateSchema,
  type UserFormValues,
  type UserUpdateValues,
} from "@/lib/schemas/user";

const UNIQUE_MESSAGES: Partial<Record<string, string>> = {
  user_email_unique: "A user with this email already exists.",
  user_id_unique: "A user with this ID already exists.",
};

export class UsersCrudController extends BaseCrudController<
  string,
  UserRow,
  UserFormValues,
  UserUpdateValues
> {
  protected readonly crudService = usersService;
  protected readonly createSchema = userFormSchema;
  protected readonly updateSchema = userUpdateSchema;

  protected parseRouteId(raw: string): string | Response {
    const id = raw.trim();
    if (id.length === 0) return jsonError("Invalid id", 400);
    return id;
  }
}

const usersCrudController = new UsersCrudController();

export const usersController: CrudController = usersCrudController.asCrudHandlers();

export const getUserByEmail: ApiHandler = async (request) => {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim();

  if (!email) return jsonError("Email is required", 400);

  const row = await usersService.getByEmail(email);
  return jsonOk(row);
};

export const usersUniqueConstraintMessages = UNIQUE_MESSAGES;
