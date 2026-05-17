import api from "./api";

import type { User } from "@/types/auth";

export const UserSerivce = {
  getAll() {
    return api.get<User[]>("users/");
  },
  addUser(user: object) {
    return api.post<User>("users/new/", user)
  },
  editUser(id: number, user: object) {
    return api.patch<User>(`admin/users/update/${id}/`, user)
  },
  editOwnData(user: FormData | Partial<User>) {
    return api.patch<User>("users/update-me/", user, {
      headers: {
        "Content-Type": "multipart/form-data",  // ✅ add this
      },
    })
  },
  getSingleUser(id: number) {
    return api.get<User>(`users/user/${id}/`)
  },
  updateUserPassword(target_user: number, new_password: string) {
    return api.post("admin-reset-password/", {
      target_user,
      new_password
    })
  },
  changeUserActivity(id: number) {
    return api.post("users/update-user-status/", {
      id
    })
  },
}
