import { defineStore } from "pinia";
import api from "@/services/api";

interface User {
  id: number;
  username: string;
  role: string;
  image: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_staff: boolean;
  is_superuser: boolean;
  family: Family | null;
}

interface Stage {
  id: number;
  name: string;
  families?: Family[];
}

interface Family {
  id: number;
  name: string;
  year?: string;
  stage?: Stage;
  user_count?: number;   // ← add
  users?: User[];        // ← add
}
interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;

  users: User[];
  stages: Stage[];
  families: Family[];
  selectedFamily: Family | null;

  loading: boolean;
  error: string | null;
}

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

        const res = await api.get(`families/${id}/`);

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
        const res = await api.get("families/");
        console.log(res.data);
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
        const res = await api.get("stages/");
        console.log(res.data);
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
        const response = await api.get<User[]>("users/");
        this.users = response.data;
      } catch (error) {
        console.error("Fetch users failed", error);
      } finally {
        this.loading = false;
      }
    },

    async login(username: string, password: string) {
      try {
        const response = await api.post("token/", {
          username,
          password,
        });
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
        const response = await api.get("me/");
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