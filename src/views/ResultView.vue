<script lang="ts" setup>
import { useResultStore } from "@/stores/results";
import { useAuthStore } from "@/stores/auth";
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const store = useResultStore();
const authStore = useAuthStore();
const route = useRoute();

onMounted(() => {
  const examId = Number(route.params.examId);
  store.getResultsByExam(examId);
});

const studentName = computed(() => authStore.user?.full_name || "");

const examName = computed(() => store.results?.[0]?.exam || "");

const totalCount = computed(() => store.results?.length ?? 0);

const passCount = computed(
  () =>
    store.results?.filter((r: any) => r.component === null && r.is_success === true).length ?? 0,
);

const failCount = computed(
  () =>
    store.results?.filter((r: any) => r.component === null && r.is_success === false).length ?? 0,
);

function scorePercent(points: number, maxGrade: number): number {
  if (!maxGrade) return 0;

  return Math.round((points / maxGrade) * 100);
}
</script>

<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat p-6"
    style="background-image: url(&quot;/src/assets/images/resBack.jpeg&quot;)"
    dir="rtl"
  >
    <div class="p-6 max-w-4xl mx-auto">
      <!-- Header -->
      <div
        class="bg-[#FFF9D2] border border-gray-200 rounded-2xl p-5 mb-4 flex items-center gap-4 shadow-sm"
      >
        <div class="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
          <img
            v-if="authStore.user?.image"
            class="w-full h-full object-cover rounded-full"
            :src="authStore.user.image"
            alt=""
          />
        </div>

        <div>
          <h1 class="text-3xl font-bold text-gray-900">
            {{ studentName }}
          </h1>

          <p class="text-lg text-gray-500 mt-0.5 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              />
            </svg>

            {{ examName }}
          </p>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-3 gap-3 mb-4">
        <!-- Total -->
        <div
          class="bg-[#FFF9D2] border border-gray-200 rounded-xl p-4 text-center"
        >
          <p class="text-lg font-bold text-gray-500 mb-1">
            إجمالي المواد
          </p>

          <p class="text-2xl font-bold text-gray-900">
            {{ totalCount }}
          </p>
        </div>

        <!-- Passed -->
        <div
          class="bg-[#FFF9D2] border border-gray-200 rounded-xl p-4 text-center"
        >
          <p class="text-lg font-bold text-gray-500 mb-1">
            المواد التي تم النجاح فيها
          </p>

          <p class="text-2xl font-bold text-emerald-700">
            {{ passCount }}
          </p>
        </div>

        <!-- Failed -->
        <div
          class="bg-[#FFF9D2] border border-gray-200 rounded-xl p-4 text-center"
        >
          <p class="text-lg font-bold text-gray-500 mb-1">
            المواد التي تم الرسوب فيها
          </p>

          <p class="text-2xl font-bold text-red-700">
            {{ failCount }}
          </p>
        </div>
      </div>

      <!-- Results Table -->
      <div
        class="bg-[#FFF9D2] border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
      >
        <!-- Table Header -->
        <div
          class="grid grid-cols-[2fr_1.6fr_1fr_1fr_100px] px-4 py-2.5 border-b border-gray-200"
        >
          <div class="text-md font-semibold text-gray-500 text-right">
            المادة
          </div>

          <div class="text-md font-semibold text-gray-500 text-center">
            درجتك
          </div>

          <div class="text-md font-semibold text-gray-500 text-center">
            درجة الترم
          </div>

          <div class="text-md font-semibold text-gray-500 text-center">
            درجة النجاح
          </div>

          <div class="text-md font-semibold text-gray-500 text-center">
            الحالة
          </div>
        </div>

        <!-- Rows -->
        <div
          v-for="result in store.results"
          :key="result.id"
          class="grid grid-cols-[2fr_1.6fr_1fr_1fr_100px] px-4 py-3.5 border-b border-gray-100 last:border-b-0 items-center hover:bg-gray-50 transition-colors"
        >
          <!-- Subject -->
          <div>
            <div class="text-lg font-semibold text-gray-900">
              {{ result.subject }}
            </div>

            <!-- Component -->
            <div
              v-if="result.component"
              class="text-sm text-gray-500 mt-0.5"
            >
              {{ result.component }}
            </div>
          </div>

          <!-- Student Score -->
          <div class="flex items-center gap-2 px-2">
            <div
              class="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden"
            >
              <div
                class="h-full rounded-full transition-all duration-500"
                :class="
                  result.is_success === true
                    ? 'bg-emerald-500'
                    : result.is_success === false
                      ? 'bg-red-600'
                      : 'bg-blue-500'
                "
                :style="{
                  width: scorePercent(
                    result.points,
                    result.max_grade
                  ) + '%',
                }"
              />
            </div>

            <span
              class="text-lg font-semibold text-gray-700 min-w-20 text-left whitespace-nowrap"
            >
              {{ result.points }} / {{ result.max_grade }}
            </span>
          </div>

          <!-- Term Grade -->
          <div class="text-lg text-gray-600 text-center">
            {{ result.max_grade }}
          </div>

          <!-- Success Grade -->
          <div class="text-lg text-gray-600 text-center">
            {{ result.success_grade ?? "—" }}
          </div>

          <!-- Status -->
          <div class="flex justify-center">
            <!-- Subject Result -->
            <span
              v-if="result.is_success !== null"
              class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-lg font-bold"
              :class="
                result.is_success
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-red-100 text-red-800'
              "
            >
              <!-- Success -->
              <svg
                v-if="result.is_success"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>

              <!-- Failed -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>

              {{ result.is_success ? "ناجح" : "راسب" }}
            </span>

            <!-- Component Result -->
            <span
              v-else
              class="inline-flex items-center px-3 py-1 rounded-full text-lg font-bold bg-blue-100 text-blue-800"
            >
              —
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
