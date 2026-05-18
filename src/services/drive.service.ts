import type { DriveItem } from "@/types/drive";
import api from "./api";

export const DriveService = {
  getAlhan(id: number) {
    return api.get<DriveItem[]>("drive/alhan/", {
      params: {
        family: id,
      },
    });
  }
}
