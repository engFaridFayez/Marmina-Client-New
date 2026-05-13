import api from "./api";
import type { Family } from "@/types/auth";

export const FamilyService = {
    getAll() {
        return api.get<Family[]>("familiesusers/")
    },
    getById(id:number){
        return api.get<Family>(`families/${id}/`);
    }
}