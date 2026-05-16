<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const isSidebarOpen = ref(false);

const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const auth = useAuthStore();
</script>

<template>
  <div class="min-h-screen bg-slate-100 py-10 px-4" dir="rtl">
    <div class="max-w-4xl mx-auto">
      <!-- Alert Card -->
      <div
        class="bg-white border border-amber-200 shadow-xl rounded-3xl p-8 text-center mb-8"
      >
        <div
          class="w-20 h-20 mx-auto mb-5 rounded-full bg-amber-100 flex items-center justify-center text-4xl"
        >
          ✏️
        </div>

        <h1 class="text-2xl md:text-3xl font-extrabold text-slate-800 leading-relaxed">
          لتعديل بيانات أي مخدوم أو خادم
        </h1>

        <p class="text-slate-600 mt-4 text-lg leading-8">
          يمكنك التوجه إلى قائمة المخدومين أو الخدام المتاحين لك ثم الضغط على زر
          <span class="text-amber-600 font-bold">"تعديل"</span>
        </p>
      </div>

      <!-- Navigation Card -->
      <div
        class="bg-linear-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-6"
      >
        <div class="flex flex-col gap-4">
          <!-- Admin / أمين شمامسة -->
          <router-link
            v-if="
              auth.user?.role === 'امين الشمامسة' ||
              auth.user?.role === 'admin' ||
              auth.user?.is_staff
            "
            @click="closeSidebar"
            to="/admin/stages"
            class="group flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] shadow-lg"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 0a9 9 0 1 0 0 18A9 9 0 0 0 9 0M1.11 9.68h2.51c.04.91.167 1.814.38 2.7H1.84a7.9 7.9 0 0 1-.73-2.7"
                />
              </svg>
            </div>

            <div>
              <h3 class="text-white text-lg font-bold">
                المراحل والأسر
              </h3>

              <p class="text-gray-400 text-sm mt-1">
                إدارة جميع المراحل والأسر المتاحة
              </p>
            </div>
          </router-link>

          <!-- أمين مرحلة -->
          <router-link
            v-else-if="auth.user?.role === 'امين مرحلة'"
            to="/admin/stages"
            @click="closeSidebar"
            class="group flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] shadow-lg"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-amber-500/20 flex items-center justify-center text-2xl"
            >
              🎯
            </div>

            <div>
              <h3 class="text-white text-lg font-bold">
                المرحلة
              </h3>

              <p class="text-gray-400 text-sm mt-1">
                عرض وإدارة المرحلة الخاصة بك
              </p>
            </div>
          </router-link>

          <!-- الأسرة -->
          <router-link
            v-else
            to="/admin/families"
            @click="closeSidebar"
            class="group flex items-center gap-4 px-6 py-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
            active-class="bg-gradient-to-r from-[#232A7E] to-[#4F46E5] shadow-lg"
          >
            <div
              class="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z"
                />
              </svg>
            </div>

            <div>
              <h3 class="text-white text-lg font-bold">
                الأسرة
              </h3>

              <p class="text-gray-400 text-sm mt-1">
                الانتقال إلى صفحة الأسرة الخاصة بك
              </p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
