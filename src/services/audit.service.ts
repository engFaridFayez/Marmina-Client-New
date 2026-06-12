import type { ActivityLog, PaginatedResponse } from "@/types/audit";
import api from "./api";

export const AuditService = {
  getLogs(page = 1) {
    return api.get<PaginatedResponse<ActivityLog>>(
      `/activity-logs/?page=${page}`
    );
  }
}
