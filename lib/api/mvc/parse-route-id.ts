import { jsonError } from "@/lib/api/views/json";

export type RouteParamsContext = {
  params: Promise<Record<string, string>>;
};

/**
 * Reads `params.id` from App Router dynamic segments and parses with resource-specific rules.
 */
export async function parseRouteIdParam(
  context: RouteParamsContext,
  parseId: (raw: string) => string | number | Response,
): Promise<string | number | Response> {
  const params = await context.params;
  const raw = params.id;
  if (raw === undefined) {
    return jsonError("Missing id", 400);
  }
  return parseId(raw);
}
