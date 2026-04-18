import { getHealth } from "@/lib/api/controllers/health.controller";
import { withApiErrorHandling } from "@/lib/api/http";

export const GET = withApiErrorHandling(getHealth);
