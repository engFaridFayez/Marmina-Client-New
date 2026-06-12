<script setup lang="ts">
import { useAuditStore } from "@/stores/audit";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();
const auditStore = useAuditStore();
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
onMounted(async () => {
  auditStore.getAuditLog();
});

const loadNext = () => {
  if (!auditStore.next) return;

  const page = getPageFromUrl(auditStore.next);
  auditStore.getAuditLog(page);
};

const loadPrev = () => {
  if (!auditStore.previous) return;

  const page = getPageFromUrl(auditStore.previous);
  auditStore.getAuditLog(page);
};

// helper
const getPageFromUrl = (url: string) => {
  const params = new URL(url).searchParams;
  return Number(params.get("page"));
};

const stats = [
  {
    title: "الأسر",
    value: "13",
    color: "from-[#232A7E] to-[#3a44a8]",
  },
  {
    title: "الخدام",
    value: "35",
    color: "from-[#D0A633] to-[#b88b22]",
  },
  {
    title: "المخدومين",
    value: "750",
    color: "from-green-500 to-green-700",
  },
  {
    title: "الحضور اليوم",
    value: "78%",
    color: "from-blue-500 to-blue-700",
  },
];
</script>

<template>
  <div class="flex h-screen bg-[#F9F5EF]" dir="rtl">
    <div class="flex-1 flex flex-col">
      <!-- Content -->
      <main class="p-6 space-y-6 overflow-y-auto">
        <!-- Welcome Card -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <h2 class="text-2xl font-bold text-[#232A7E]">👋 أهلاً بك في نظام الشمامسة</h2>
          <p class="text-gray-500 mt-2">متابعة الأسر، الخدام، والحضور من مكان واحد</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="p-6 rounded-2xl text-white shadow-lg bg-linear-to-r"
            :class="stat.color"
          >
            <p class="text-sm opacity-80">{{ stat.title }}</p>
            <h2 class="text-3xl font-bold mt-2">{{ stat.value }}</h2>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 class="font-bold text-[#232A7E] text-xl">إدارة الأسر</h3>
            <p class="text-gray-500 mt-2">عرض وتعديل الأسر والخدام</p>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 class="font-bold text-[#232A7E] text-xl">الحضور</h3>
            <p class="text-gray-500 mt-2">متابعة حضور الخدمة</p>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 class="font-bold text-[#232A7E] text-xl">التقارير</h3>
            <p class="text-gray-500 mt-2">إحصائيات وتحليلات</p>
          </div>
        </div>

        <!-- Activity -->
        <div
          v-if="authStore.user?.role == 'امين الشمامسة' || authStore.user?.role == 'admin'"
          class="bg-white p-6 rounded-2xl shadow"
        >
          <h3 class="text-xl font-bold text-[#232A7E] mb-4">آخر النشاطات</h3>

          <!-- Timeline -->
          <ul class="space-y-4 border-l border-gray-200 pl-4">
            <li v-for="log in auditStore.logs" :key="log.id" class="relative">
              <span class="absolute -left-2.25 top-3 w-3 h-3 bg-blue-500 rounded-full"></span>

              <div class="bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                <p class="text-gray-700 font-medium">✔ {{ log.message }}</p>

                <div class="text-xs text-gray-400 mt-1">👤 {{ log.actor_name }}</div>

                <div class="text-xs text-gray-400 mt-1">🕒 {{ formatDate(log.created_at) }}</div>
              </div>
            </li>
          </ul>

          <!-- Pagination -->
          <div class="flex items-center justify-between mt-6">
            <button
              class="px-4 py-2 text-sm rounded-lg bg-gray-100 disabled:opacity-50"
              :disabled="!auditStore.previous"
              @click="loadPrev"
            >
              ⬅ السابق
            </button>

            <span class="text-sm text-gray-500"> إجمالي: {{ auditStore.count }} </span>

            <button
              class="px-4 py-2 text-sm rounded-lg bg-gray-100 disabled:opacity-50"
              :disabled="!auditStore.next"
              @click="loadNext"
            >
              التالي ➡
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
