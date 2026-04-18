import type { HealthStatus } from "@/lib/api/models/health";

export const healthService = {
  getStatus(): HealthStatus {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  },
};
