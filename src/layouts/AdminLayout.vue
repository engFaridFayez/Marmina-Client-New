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
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
          </svg>

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
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20">
            <path d="M0 0h20v20H0z" fill="none" />
            <path
              fill="currentColor"
              d="M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0M1.11 9.68h2.51c.04.91.167 1.814.38 2.7H1.84a7.9 7.9 0 0 1-.73-2.7m8.57-5.4V1.19a4.13 4.13 0 0 1 2.22 2q.308.521.54 1.08zm3.22 1.35c.232.883.37 1.788.41 2.7H9.68v-2.7zM8.32 1.19v3.09H5.56A8.5 8.5 0 0 1 6.1 3.2a4.13 4.13 0 0 1 2.22-2.01m0 4.44v2.7H4.7c.04-.912.178-1.817.41-2.7zm-4.7 2.69H1.11a7.9 7.9 0 0 1 .73-2.7H4a14 14 0 0 0-.38 2.7M4.7 9.68h3.62v2.7H5.11a13 13 0 0 1-.41-2.7m3.63 4v3.09a4.13 4.13 0 0 1-2.22-2a8.5 8.5 0 0 1-.54-1.08zm1.35 3.09v-3.04h2.76a8.5 8.5 0 0 1-.54 1.08a4.13 4.13 0 0 1-2.22 2zm0-4.44v-2.7h3.62a13 13 0 0 1-.41 2.7zm4.71-2.7h2.51a7.9 7.9 0 0 1-.73 2.7H14c.21-.87.337-1.757.38-2.65zm0-1.35A14 14 0 0 0 14 5.63h2.16c.403.85.65 1.764.73 2.7zm1-4H13.6a8.9 8.9 0 0 0-1.39-2.52a8 8 0 0 1 3.14 2.52zm-9.6-2.52A8.9 8.9 0 0 0 4.4 4.28H2.65a8 8 0 0 1 3.14-2.52m-3.15 12H4.4a8.9 8.9 0 0 0 1.39 2.52a8 8 0 0 1-3.14-2.55zm9.56 2.52a8.9 8.9 0 0 0 1.39-2.52h1.76a8 8 0 0 1-3.14 2.48z"
            />
          </svg>

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
          :to="`/family/${auth.user?.family?.id}`"
          @click="closeSidebar"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
          </svg>

          <span>الأسرة</span>
        </router-link>

        <router-link
          v-if="
            auth.user?.role === 'امين مرحلة' ||
            auth.user?.role === 'امين الشمامسة' ||
            auth.user?.role === 'admin'
          "
          to="/admin/addUser"
          @click="closeSidebar"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="currentColor"
              d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7zm11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1"
            />
          </svg>

          <span>اضافة خادم / مخدوم</span>
        </router-link>
        <router-link
          v-if="auth.user?.role === 'امين اسرة'"
          to="/admin/addUser"
          @click="closeSidebar"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="currentColor"
              d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7zm11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1"
            />
          </svg>

          <span>اضافة مخدوم</span>
        </router-link>

        <router-link
          v-if="
            auth.user?.role === 'امين مرحلة' ||
            auth.user?.role === 'امين الشمامسة' ||
            auth.user?.role === 'admin'
          "
          to="/edit-prompt"
          @click="closeSidebar"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h3.5m4.92.61a2.1 2.1 0 0 1 2.97 2.97L18 22h-3v-3z"
            />
          </svg>

          <span>تعديل خادم / مخدوم</span>
        </router-link>

        <router-link
          v-if="auth.user?.role === 'امين اسرة'"
          to="/edit-prompt"
          @click="closeSidebar"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0-8 0M6 21v-2a4 4 0 0 1 4-4h3.5m4.92.61a2.1 2.1 0 0 1 2.97 2.97L18 22h-3v-3z"
            />
          </svg>

          <span>تعديل مخدوم</span>
        </router-link>

        <router-link
          to="/admin/settings"
          @click="closeSidebar"
          class="flex items-center gap-3 px-5 py-3 rounded-2xl text-gray-300 hover:bg-white/10 hover:text-white transition-all duration-300 font-medium"
          active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] text-white shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              fill="currentColor"
              d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"
            />
          </svg>

          <span>الإعدادات</span>
        </router-link>
      </nav>

      <!-- User Card -->
      <div class="p-4 border-t border-white/10">
        <div class="bg-white/5 rounded-2xl p-4 mb-4 border border-white/10">
          <div class="flex items-center gap-3">
            <img :src="auth.user?.image" class="w-12 h-12 rounded-xl object-cover" />

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
            <img :src="auth.user?.image" class="w-10 h-10 rounded-xl object-cover" />

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
