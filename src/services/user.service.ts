import api from "./api";

import type { User } from "@/types/auth";

export const UserSerivce = {
    getAll() {
        return api.get<User[]>("users/");
    },
}