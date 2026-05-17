import { defineStore } from "pinia";

import { UserSerivce } from "@/services/user.service";
import { FamilyService } from "@/services/family.service";
import { StageService } from "@/services/stage.service";
import { AuthService } from "@/services/auth.service";
import type { AuthState, User } from "@/types/auth";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    selectedUser: null,
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),

    users: [],
    stages: [],
    families: [],
    selectedFamily: null,

    loading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.access;
    },
  },

  actions: {
    async changeUserActivity(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await UserSerivce.changeUserActivity(id)
        return response.data
      } catch (error: any) {
        this.error = "حدث خطأ"
        throw error
      } finally {
        this.loading = false
      }
    },
    async updateUserPassword(target_user: number, new_password: string) {
      this.loading = true
      this.error = null

      try {
        const response = await UserSerivce.updateUserPassword(target_user, new_password)
        return response.data;
      } catch (error: any) {

        this.error =
          Array.isArray(error.response?.data?.response)
            ? error.response.data.response.join(", ")   // ← join array into string
            : error.response?.data?.response || "حدث خطأ أثناء تغيير كلمة المرور";
        throw error;

      } finally {

        this.loading = false;

      }
    },
    async editOwnData(user: FormData | Partial<User>) {
      this.loading = true
      this.error = null

      try {
        const response = await UserSerivce.editOwnData(user)
        this.user = response.data
      } catch (error: any) {
        this.error = error.response?.data || "error"
        console.log(error.response?.data)
      } finally {
        this.loading = false
      }
    },
    async editUser(id: number, data: object) {
      this.loading = true
      this.error = null

      try {
        const response = await UserSerivce.editUser(id, data)
        const index = this.users.findIndex(p => p.id === id)
        if (index !== -1) {
          this.users[index] = response.data
        }
      } catch (error: any) {
        this.error = error.response?.data || "error"
        console.log(error.response?.data)
        console.log(error.response)

        throw error
      } finally {
        this.loading = false
      }
    },
    async getSignleUser(id: number) {
      this.loading = true
      this.error = null

      try {
        const response = await UserSerivce.getSingleUser(id)
        this.selectedUser = response.data
      } catch (error: any) {
        this.error = error.response?.data || "error"
        console.log(error.response?.data)
        console.log(error.response)
      } finally {
        this.loading = false
      }
    },
    async addUser(data: object) {
      try {
        this.loading = true
        this.error = null

        const response = await UserSerivce.addUser(data)
        this.selectedUser = response.data

        return response.data
      } catch (error: any) {
        this.error = error.response?.data || "error"
        console.log(error.response?.data)
        console.log(error.response)

        throw error
      } finally {
        this.loading = false
      }
    },
    async getFamilyById(id: number) {
      try {
        this.loading = true;
        const res = await FamilyService.getById(id);
        this.selectedFamily = res.data;
      } catch (err) {
        this.error = "Failed to load family";
      } finally {
        this.loading = false;
      }
    },
    async getFamilies() {
      try {
        this.loading = true;
        const res = await FamilyService.getAll();
        this.families = res.data;
      } catch (err) {
        this.error = "Failed to load families";
      } finally {
        this.loading = false;
      }
    },

    async getStages() {
      try {
        this.loading = true;
        const res = await StageService.getAll();
        this.stages = res.data;
      } catch (err) {
        this.error = "Failed to load stages";
      } finally {
        this.loading = false;
      }
    },

    async getUsers() {
      this.loading = true;
      this.error = null;
      try {
        const response = await UserSerivce.getAll();
        this.users = response.data;
      } catch (error) {
        console.error("Fetch users failed", error);
      } finally {
        this.loading = false;
      }
    },

    async login(username: string, password: string) {
      try {
        const response = await AuthService.login(username, password);
        this.access = response.data.access;
        this.refresh = response.data.refresh;

        localStorage.setItem("access", this.access!);
        localStorage.setItem("refresh", this.refresh!);

        await this.fetchUser();
      } catch (error) {
        console.error("Login failed", error);
        throw error;
      }
    },

    async fetchUser() {
      this.loading = true;
      try {
        const response = await AuthService.me();
        this.user = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Fetch user failed", error);
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      this.user = null;
      this.access = null;
      this.refresh = null;
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },
});
