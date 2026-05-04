import { defineStore } from "pinia";
import api from "@/services/api";

interface User {
  username: string;
  role: string;
  image: string
}

interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    access: localStorage.getItem("access"),
    refresh: localStorage.getItem("refresh"),
  }),

  getters: {
    isAuthenticated: (state) => {
      return !!state.access;
    },
  },
  actions: {
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
      try {
        const response = await api.get("me/");
        this.user = response.data;
        console.log(response.data);
        
      } catch (error) {
        console.error("Fetch user failed", error);
      }
    },

    async logout() {
      this.user = null;
      this.access = null;
      this.refresh = null;
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
    },
  },
});
