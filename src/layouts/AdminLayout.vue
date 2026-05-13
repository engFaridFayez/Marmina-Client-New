<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";
import router from "@/router";
import { ref } from "vue";

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

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
  <div class="flex h-screen bg-[#f4f6fb] overflow-hidden" dir="rtl">
    <!-- Overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black/40 z-40 md:hidden"
      @click="closeSidebar"
    ></div>
    <!-- Sidebar -->
    <aside
      :class="[
        'w-72 bg-[#111827] text-white flex flex-col border-l border-white/10 shadow-2xl',
        'fixed md:static top-0 right-0 h-full z-50 transition-transform duration-300',
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0',
      ]"
    >
      <div class="md:hidden flex justify-end p-4">
        <button @click="closeSidebar" class="text-white text-xl">✕</button>
      </div>
      <!-- Logo -->
      <router-link
        to="/admin"
        @click="closeSidebar"
        class="p-6 border-b border-white/10 hover:bg-white/5 transition-all duration-300"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-12 h-12 rounded-2xl bg-linear-to-br from-[#232A7E] to-[#4F46E5] flex items-center justify-center text-xl font-bold shadow-lg"
          >
            D
          </div>

          <div>
            <h2 class="text-2xl font-extrabold tracking-wide">Dashboard</h2>

            <p class="text-xs text-gray-400 mt-1">Deacons System</p>
          </div>
        </div>
      </router-link>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2 overflow-y-auto">
        <router-link
          @click="closeSidebar"
          to="/"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <span>🏠</span>
          <span>الصفحة الرئيسية</span>
        </router-link>

        <router-link
          v-if="
            auth.user?.role === 'امين الشمامسة' ||
            auth.user?.role === 'admin' ||
            auth.user?.is_staff
          "
          @click="closeSidebar"
          to="/admin/stages"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <span>📚</span>
          <span>المراحل والأسر</span>
        </router-link>

        <router-link
          v-else-if="auth.user?.role === 'امين مرحلة'"
          to="/admin/stages"
          @click="closeSidebar"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <span>🎯</span>
          <span>المرحلة</span>
        </router-link>

        <router-link
          v-else
          to="/admin/families"
          @click="closeSidebar"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <span>👨‍👩‍👦</span>
          <span>الأسرة</span>
        </router-link>

        <router-link
          to="/admin/settings"
          @click="closeSidebar"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <span>⚙️</span>
          <span>الإعدادات</span>
        </router-link>
      </nav>

      <!-- User Card -->
      <div class="p-4 border-t border-white/10">
        <div class="bg-white/5 rounded-2xl p-4 mb-4 border border-white/10">
          <div class="flex items-center gap-3">
            <img src="https://i.pravatar.cc/100" class="w-12 h-12 rounded-xl object-cover" />

            <div>
              <h3 class="font-bold text-sm">
                {{ auth.user?.full_name || "مستخدم" }}
              </h3>

              <p class="text-xs text-gray-400 mt-1">
                {{ auth.user?.is_staff ? "Admin" : auth.user?.role }}
              </p>
            </div>
          </div>
        </div>

        <!-- Logout -->
        <button
          @click="handleLogout"
          class="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-3 rounded-2xl font-semibold shadow-lg hover:scale-[1.02]"
        >
          تسجيل الخروج
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Topbar -->
      <header
        class="h-20 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm"
      >
        <button
          class="md:hidden w-10 h-10 rounded-xl bg-[#f5f7fb] flex items-center justify-center"
          @click="toggleSidebar"
        >
          ☰
        </button>
        <!-- Search -->
        <div class="relative w-full max-w-xl">
          <input
            type="text"
            placeholder="ابحث عن أسر أو مستخدمين..."
            class="w-full bg-[#f5f7fb] border border-gray-200 rounded-2xl py-3 pr-5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/30 focus:border-[#4F46E5] transition-all"
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0a7 7 0 0114 0z"
            />
          </svg>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-4 mr-6">
          <!-- Notifications -->
          <button
            class="relative w-12 h-12 rounded-2xl bg-[#f5f7fb] hover:bg-gray-100 transition flex items-center justify-center"
          >
            🔔

            <span
              class="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center"
            >
              3
            </span>
          </button>

          <!-- Profile -->
          <router-link
            to="/profile"
            class="flex items-center gap-3 bg-[#f5f7fb] hover:bg-gray-100 transition px-4 py-2 rounded-2xl"
          >
            <img src="https://i.pravatar.cc/40" class="w-10 h-10 rounded-xl object-cover" />

            <div class="hidden md:block">
              <p class="font-bold text-sm text-[#232A7E]">
                {{ auth.user?.full_name || "مستخدم" }}
              </p>

              <p class="text-xs text-gray-500">
                {{ auth.user?.is_staff ? "Admin" : auth.user?.role }}
              </p>
            </div>
          </router-link>
        </div>
      </header>

      <!-- Page -->
      <main class="flex-1 overflow-y-auto p-6">
        <div class="bg-white min-h-full rounded-3xl shadow-sm border border-gray-100 p-6">
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>
