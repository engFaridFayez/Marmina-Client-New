import api from "./api";
import type { Stage } from "@/types/auth";

export const StageService = {
    getAll() {
        return api.get<Stage[]>("stagesusers/");
    },
}