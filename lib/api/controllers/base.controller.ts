import type { CrudHandlers } from "@/lib/api/crud/types";
import { parseJsonBody } from "@/lib/api/http";
import type { ApiHandler } from "@/lib/api/http";
import { parseRouteIdParam } from "@/lib/api/mvc/parse-route-id";
import type { PaginatedList } from "@/lib/api/models/pagination";
import { jsonCreated, jsonNoContent, jsonOk } from "@/lib/api/views/json";
import type { z } from "zod";

export type CrudController = CrudHandlers;

/** Minimal CRUD surface entity services expose to HTTP controllers. */
export interface CrudServiceFacade<TId extends string | number, TRow, TCreate, TUpdate> {
  list(request: Request): Promise<PaginatedList<TRow> | Response>;
  getById(id: TId): Promise<TRow>;
  create(data: TCreate): Promise<TRow>;
  update(id: TId, data: TUpdate): Promise<TRow>;
  deleteById(id: TId): Promise<void>;
}

export abstract class BaseCrudController<TId extends string | number, TRow, TCreate, TUpdate> {
  protected abstract readonly crudService: CrudServiceFacade<TId, TRow, TCreate, TUpdate>;

  protected abstract parseRouteId(raw: string): TId | Response;

  protected abstract readonly createSchema: z.ZodType<TCreate>;

  protected abstract readonly updateSchema: z.ZodType<TUpdate>;

  readonly list: ApiHandler = async (request) => {
    const result = await this.crudService.list(request);
    if (result instanceof Response) return result;
    return jsonOk(result);
  };

  readonly get: ApiHandler = async (_request, context) => {
    const idOrRes = await parseRouteIdParam(context, (raw) => this.parseRouteId(raw));
    if (idOrRes instanceof Response) return idOrRes;
    const id = idOrRes as TId;
    const row = await this.crudService.getById(id);
    return jsonOk(row);
  };

  readonly create: ApiHandler = async (request) => {
    const parsed = await parseJsonBody(request, this.createSchema);
    const row = await this.crudService.create(parsed);
    return jsonCreated(row);
  };

  readonly update: ApiHandler = async (request, context) => {
    const idOrRes = await parseRouteIdParam(context, (raw) => this.parseRouteId(raw));
    if (idOrRes instanceof Response) return idOrRes;
    const id = idOrRes as TId;
    const parsed = await parseJsonBody(request, this.updateSchema);
    const row = await this.crudService.update(id, parsed);
    return jsonOk(row);
  };

  readonly delete: ApiHandler = async (_request, context) => {
    const idOrRes = await parseRouteIdParam(context, (raw) => this.parseRouteId(raw));
    if (idOrRes instanceof Response) return idOrRes;
    const id = idOrRes as TId;
    await this.crudService.deleteById(id);
    return jsonNoContent();
  };

  asCrudHandlers(): CrudController {
    return {
      list: this.list,
      get: this.get,
      create: this.create,
      update: this.update,
      delete: this.delete,
    };
  }
}
