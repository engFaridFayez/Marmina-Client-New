import { defineStore } from "pinia";
import api from "@/services/api";

interface User {
  username: string;
  role: string;
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
      console.log("Getter access:", state.access);
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

        console.log("RESPONSE:", response.data);

        this.access = response.data.access;
        this.refresh = response.data.refresh;

        console.log("STORE AFTER SET:", this.access);

        localStorage.setItem("access", this.access!);
        localStorage.setItem("refresh", this.refresh!);

        console.log("LOCAL STORAGE:", localStorage.getItem("access"));

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
      } catch (error) {
        console.error("Fetch user failed", error);
      }
    },
  },
});
