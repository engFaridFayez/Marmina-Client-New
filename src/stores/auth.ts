import { defineStore } from "pinia";

import { UserSerivce } from "@/services/user.service";
import { FamilyService } from "@/services/family.service";
import { StageService } from "@/services/stage.service";
import { AuthService } from "@/services/auth.service";
import type { AuthState } from "@/types/auth";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
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
        const response = await AuthService.login(username,password);
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