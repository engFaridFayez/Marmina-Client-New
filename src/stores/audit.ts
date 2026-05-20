import { AuditService } from "@/services/audit.service";
import type { ActivityLog, PaginatedResponse } from "@/types/audit";
import { defineStore } from "pinia";

export const useAuditStore = defineStore("audit", {
  state: () => ({
    logs: [] as ActivityLog[],
    loading: false,
    error: null as string | null,

    count: 0,
    next: null as string | null,
    previous: null as string | null,
  }),

  actions: {
    async getAuditLog(page = 1) {
      this.loading = true;
      this.error = null;

      try {
        const response = await AuditService.getLogs(page);

        const data: PaginatedResponse<ActivityLog> = response.data;

        this.logs = data.results;
        this.count = data.count;
        this.next = data.next;
        this.previous = data.previous;
        console.log(response.data);

      } catch (error) {
        console.error(error);
        this.error = "Failed to load logs";
      } finally {
        this.loading = false;
      }
    },
  },
});
