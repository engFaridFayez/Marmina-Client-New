import { DriveService } from "@/services/drive.service";
import type { DriveItem } from "@/types/drive";
import { defineStore } from "pinia";

export const useDriveStore = defineStore("drive", {
  state: () => ({
    driveItems: [] as DriveItem[],
    error: null as string | null,
    cache: {} as Record<number, DriveItem[]>,
  }),

  actions: {
    async getAlhan(id: number) {
      try {
        // ✅ 1. check cache first
        if (this.cache[id]) {
          this.driveItems = this.cache[id];
          return;
        }

        // 🌐 2. call API only if not cached
        const response = await DriveService.getAlhan(id);

        this.driveItems = response.data;

        // 💾 3. save to cache
        this.cache[id] = response.data;

      } catch (error) {
        this.error = "can't fetch alhan";
        console.error(error);
      }
    }
  }
})
