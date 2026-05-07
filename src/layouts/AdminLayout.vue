<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";
import router from "@/router";

const auth = useAuthStore();
const toast = useToast();

const handleLogout = () => {
  try {
    auth.logout();
    toast.success("تم تسجيل خروجك");
    router.push("/");
  } catch (error) {
    toast.error("فشل تسجيل الخروج");
  }
};
</script>

<template>
  <div class="flex h-screen bg-[#F9F5EF] overflow-hidden" dir="rtl">
    <!-- Sidebar -->
    <aside class="w-72 bg-gray-900 text-white flex flex-col">
      <!-- Logo/Header -->
      <div class="p-6 border-b border-gray-800">
        <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <router-link
          to="/admin"
          class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-2xl transition-all duration-200 font-medium active-link"
        >
          الرئيسية
        </router-link>

        <router-link
          v-if="auth.user?.role === 'امين اسرة' || auth.user?.is_staff"
          to="/admin/stages"
          class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-2xl transition-all duration-200 font-medium active-link"
        >
          المراحل والأسر
        </router-link>

        <router-link
          to="/admin/families"
          class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-2xl transition-all duration-200 font-medium active-link"
        >
          الأسر
        </router-link>

        <router-link
          to="/admin/settings"
          class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-2xl transition-all duration-200 font-medium active-link"
        >
          الإعدادات
        </router-link>
      </nav>

      <!-- Logout -->
      <div class="p-4 border-t border-gray-800">
        <button
          @click="handleLogout"
          class="w-full bg-red-600 hover:bg-red-700 transition-colors text-white py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-medium"
        >
          تسجيل الخروج
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Topbar -->
      <header class="h-16 bg-white border-b flex items-center px-6 gap-6">
        <!-- Search -->
        <div class="flex-1 max-w-xl relative">
          <input
            type="text"
            placeholder="ابحث عن أسر أو مستخدمين..."
            class="w-full bg-gray-50 border border-gray-200 rounded-2xl py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:border-[#232A7E] focus:ring-1 focus:ring-[#232A7E]/30 transition-all"
          />
        </div>

        <!-- Right Side -->
        <div class="flex items-center gap-5">
          <!-- Notifications -->
          <button class="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-9-5.197V8.5m.002 3.5L12 15l-1.998-3.5"
              />
            </svg>
            <span class="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-medium w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>

          <!-- User Profile -->
          <div class="flex items-center gap-3 bg-gray-50 px-3 py-1.5 rounded-2xl">
            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              class="w-8 h-8 rounded-full object-cover ring-2 ring-white"
            />
            <div>
              <p class="font-semibold text-[#232A7E] text-sm leading-tight">
                {{ auth.user?.full_name || "مستخدم" }}
              </p>
              <p class="text-gray-500 text-xs">
                Admin
              </p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>