import type { ZodError } from "zod";

import { friendlyPostgresMessage } from "@/lib/api/db-errors";

/** Short human-readable message from any thrown value (no stack/SQL dumps). */
function shortErrorMessage(err: unknown): string {
  const pg = friendlyPostgresMessage(err);
  if (pg) return pg;

  if (err instanceof Error) {
    const msg = err.message.trim();
    if (msg.length === 0) return "Something went wrong";
    // Drizzle wraps failures as "Failed query: ...\nparams: ..." — unreadable in APIs
    if (/Failed query:/i.test(msg)) {
      return "Database operation failed";
    }
    return msg;
  }
  if (typeof err === "string" && err.trim().length > 0) {
    return err.trim();
  }
  return "Something went wrong";
}

export function jsonOk<T>(data: T, init?: ResponseInit): Response {
  return Response.json(
    { ok: true as const, status: 200, message: "OK", data },
    { status: 200, ...init },
  );
}

export function jsonCreated<T>(data: T, init?: ResponseInit): Response {
  return Response.json(
    { ok: true as const, status: 201, message: "Created", data },
    { status: 201, ...init },
  );
}

export function jsonError(message: string, status = 400, init?: ResponseInit): Response {
  return Response.json({ ok: false as const, status, message }, { status, ...init });
}

export function jsonConflict(message: string, init?: ResponseInit): Response {
  return jsonError(message, 409, init);
}

export function jsonNoContent(): Response {
  return new Response(null, { status: 204 });
}

export function jsonValidationError(_error: ZodError, init?: ResponseInit): Response {
  return Response.json(
    { ok: false as const, status: 400, message: "Validation failed" },
    { status: 400, ...init },
  );
}

/** 500 JSON with a short message only (no stack/details). */
export function jsonInternalError(err: unknown, init?: ResponseInit): Response {
  return Response.json(
    { ok: false as const, status: 500, message: shortErrorMessage(err) },
    { status: 500, ...init },
  );
}
