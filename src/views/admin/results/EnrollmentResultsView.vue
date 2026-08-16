<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";

const route = useRoute();
const router = useRouter();

const resultStore = useResultStore();

const enrollmentId = Number(route.params.enrollmentId);

onMounted(async () => {
  await resultStore.getEnrollmentResults(enrollmentId);
});

const goBack = () => {
  router.back();
};

const goToCreate = () => {
  router.push(`/admin/results/enrollments/${enrollmentId}/results/new`);
};

const goToEdit = (resultId: number) => {
  router.push(`/admin/results/enrollments/${enrollmentId}/results/${resultId}/edit`);
};

const deleteResult = async (resultId: number) => {
  if (!confirm("هل أنت متأكد من حذف هذه النتيجة؟")) return;

  await resultStore.deleteResult(resultId);
};
</script>

<template>
  <div dir="rtl" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          @click="goBack"
          class="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
        >
          ←
        </button>

        <div>
          <h1 class="text-2xl font-bold text-[#232A7E]">نتائج السنة الدراسية</h1>

          <p class="text-gray-500 mt-1">تفاصيل الدرجات لكل مادة</p>
        </div>
      </div>

      <!-- Add Result -->
      <button
        @click="goToCreate"
        class="px-5 py-2.5 rounded-xl bg-[#232A7E] text-white font-bold hover:bg-[#1b2263] transition"
      >
        + إضافة نتيجة
      </button>
    </div>

    <!-- Loading -->
    <div
      v-if="resultStore.loading"
      class="bg-white rounded-2xl border border-gray-100 p-12 text-center"
    >
      <div class="text-4xl mb-4">⏳</div>
      <p class="text-gray-400">جاري تحميل النتائج...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="resultStore.error"
      class="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5"
    >
      ⚠️ {{ resultStore.error }}
    </div>

    <!-- Empty -->
    <div
      v-else-if="resultStore.enrollmentResults.length === 0"
      class="bg-white rounded-2xl border border-gray-100 p-12 text-center"
    >
      <div class="text-5xl mb-4">📊</div>
      <h3 class="font-bold text-gray-700">لا توجد نتائج</h3>
      <p class="text-gray-400 mt-2">لم يتم تسجيل نتائج لهذه السنة الدراسية بعد</p>
    </div>

    <!-- Results -->
    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div class="space-y-3">
        <div
          v-for="result in resultStore.enrollmentResults"
          :key="result.id"
          class="flex items-center justify-between border border-gray-100 rounded-xl p-4"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-[#F5F2E8] text-[#232A7E] flex items-center justify-center text-xl"
            >
              📖
            </div>

            <div>
              <h4 class="font-bold text-gray-800">
                {{ result.subject }}
                <span v-if="result.component" class="text-sm font-normal text-gray-400">
                  ({{ result.component }})
                </span>
              </h4>

              <p class="text-sm text-gray-400 mt-1">{{ result.exam }}</p>

              <p v-if="result.success_grade !== null" class="text-sm text-gray-400 mt-1">
                درجة النجاح: {{ result.success_grade }}
              </p>
            </div>
          </div>

          <div class="text-left">
            <span
              class="text-2xl font-bold"
              :class="
                result.is_success === null
                  ? 'text-gray-700'
                  : result.is_success
                    ? 'text-green-600'
                    : 'text-red-500'
              "
            >
              {{ result.points }} / {{ result.max_grade }}
            </span>

            <p
              v-if="result.is_success !== null"
              class="text-xs font-bold mt-1"
              :class="result.is_success ? 'text-green-600' : 'text-red-500'"
            >
              {{ result.is_success ? "ناجح" : "راسب" }}
            </p>

            <p v-else class="text-xs font-bold mt-1 text-gray-400">مكوّن</p>

            <!-- Actions -->
            <div class="flex items-center gap-2 mt-3 justify-end">
              <button
                @click="goToEdit(result.id)"
                class="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
                title="تعديل"
              >
                ✏️
              </button>

              <button
                @click="deleteResult(result.id)"
                :disabled="resultStore.loading"
                class="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition flex items-center justify-center disabled:opacity-40"
                title="حذف"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
