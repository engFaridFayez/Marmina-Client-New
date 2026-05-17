<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";
import { reactive } from "vue";

const authStore = useAuthStore();

const settings = reactive({
  notifications: true,
  darkMode: false,
});

onMounted(async () => {
  await authStore.fetchUser();
});

const goToEditProfile = () => {
  router.push({ name: "update-me" });
};

const goToChangePassword = () => {
  router.push({ name: "change-password" }); // adjust to your route name
};

const logout = () => {
  authStore.logout();
  router.push({ name: "login" });
};
</script>

<template>
  <div class="min-h-screen bg-slate-100 p-6" dir="rtl">
    <div class="max-w-2xl mx-auto space-y-5">
      <!-- Header -->
      <div class="mb-2">
        <h1 class="text-2xl font-bold text-slate-800">الإعدادات</h1>
        <p class="text-slate-500 text-sm">إدارة حسابك وتفضيلاتك</p>
      </div>

      <!-- Account -->
      <div>
        <p class="text-xs text-slate-400 mb-2 px-1">الحساب</p>
        <div class="bg-white rounded-2xl shadow divide-y divide-slate-100">
          <button
            @click="goToEditProfile"
            class="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 transition text-right rounded-t-2xl"
          >
            <span class="text-slate-400 text-lg">✏️</span>
            <span class="flex-1 text-slate-700 font-medium">تعديل البيانات الشخصية</span>
            <span class="text-slate-300">‹</span>
          </button>
          <button
            @click="goToChangePassword"
            class="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-50 transition text-right rounded-b-2xl"
          >
            <span class="text-slate-400 text-lg">🔒</span>
            <span class="flex-1 text-slate-700 font-medium">تغيير كلمة المرور</span>
            <span class="text-slate-300">‹</span>
          </button>
        </div>
      </div>

      <!-- Preferences -->
      <div>
        <p class="text-xs text-slate-400 mb-2 px-1">التفضيلات</p>
        <div class="bg-white rounded-2xl shadow divide-y divide-slate-100">
          <div class="flex items-center justify-between px-4 py-3">
            <div>
              <p class="text-slate-700 font-medium">الإشعارات</p>
              <p class="text-xs text-slate-400">استقبال التنبيهات</p>
            </div>
            <input
              type="checkbox"
              v-model="settings.notifications"
              class="w-5 h-5 accent-indigo-600"
            />
          </div>
          <div class="flex items-center justify-between px-4 py-3">
            <div>
              <p class="text-slate-700 font-medium">الوضع الليلي</p>
              <p class="text-xs text-slate-400">تغيير مظهر الواجهة</p>
            </div>
            <input type="checkbox" v-model="settings.darkMode" class="w-5 h-5 accent-indigo-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
