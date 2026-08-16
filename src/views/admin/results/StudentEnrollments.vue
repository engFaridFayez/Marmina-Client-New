<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";

const route = useRoute();
const router = useRouter();

const resultStore = useResultStore();

const studentId = Number(route.params.studentId);
const student = computed(() => {
  return resultStore.enrollments[0] ?? null;
});

onMounted(async () => {
  await resultStore.getStudentEnrollments(studentId);
});

const goBack = () => {
  router.back();
};

const openEnrollmentResults = (enrollmentId: number) => {
  router.push(`/admin/results/enrollments/${enrollmentId}`);
};
</script>

<template>
  <div dir="rtl" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <button
        @click="goBack"
        class="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
      >
        ←
      </button>

      <div>
        <h1 class="text-2xl font-bold text-[#232A7E]">السجل الدراسي</h1>

        <p class="text-gray-500 mt-1">اختر السنة الدراسية لعرض النتائج</p>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="resultStore.loading"
      class="bg-white rounded-2xl border border-gray-100 p-12 text-center"
    >
      <div class="text-4xl mb-4">⏳</div>

      <p class="text-gray-400">جاري تحميل السجل الدراسي...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="resultStore.error"
      class="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5"
    >
      ⚠️ {{ resultStore.error }}
    </div>

    <!-- Content -->
    <template v-else>
      <!-- Student Header -->
      <div
        v-if="resultStore.enrollments.length"
        class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-16 h-16 rounded-2xl bg-linear-to-br from-[#232A7E] to-[#4F46E5] text-white flex items-center justify-center text-2xl"
          >
            👨‍🎓
          </div>

          <div v-if="student">
            <p class="text-sm text-gray-400">المخدوم</p>

            <h2 class="text-xl font-bold text-gray-800">
              {{ student.student_name }}
            </h2>

            <p class="text-sm text-gray-500 mt-1">
              {{ student.stage_name }}
            </p>
          </div>
        </div>
      </div>

      <!-- Empty -->
      <div
        v-if="resultStore.enrollments.length === 0"
        class="bg-white rounded-2xl border border-gray-100 p-12 text-center"
      >
        <div class="text-5xl mb-4">📚</div>

        <h3 class="font-bold text-gray-700">لا يوجد سجل دراسي</h3>

        <p class="text-gray-400 mt-2">لا توجد سنوات دراسية مسجلة لهذا المخدوم</p>
      </div>

      <!-- Enrollments -->
      <div v-else class="space-y-4">
        <h2 class="text-xl font-bold text-[#232A7E]">السنوات الدراسية</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <button
            v-for="enrollment in resultStore.enrollments"
            :key="enrollment.id"
            @click="openEnrollmentResults(enrollment.id)"
            class="group bg-white border border-gray-100 rounded-2xl p-6 text-right shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-[#232A7E]/30 transition-all duration-300"
          >
            <!-- Top -->
            <div class="flex items-center justify-between mb-5">
              <div
                class="w-12 h-12 rounded-xl bg-[#F5F2E8] text-[#232A7E] flex items-center justify-center text-xl"
              >
                📅
              </div>

              <!-- Status -->
              <span
                v-if="enrollment.status === 'ناجح'"
                class="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold"
              >
                ناجح
              </span>

              <span
                v-else-if="enrollment.status === 'راسب'"
                class="px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold"
              >
                راسب
              </span>

              <span
                v-else
                class="px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-xs font-bold"
              >
                لم يتم التقييم
              </span>
            </div>

            <!-- Academic Year -->
            <h3 class="text-xl font-bold text-gray-800 group-hover:text-[#232A7E] transition">
              {{ enrollment.academic_year }}
            </h3>

            <!-- Family -->
            <p class="text-gray-500 mt-2">
              الأسرة:
              <span class="font-semibold text-gray-700">
                {{ enrollment.family_name }}
              </span>
            </p>

            <!-- Stage -->
            <p class="text-gray-400 text-sm mt-1">
              المرحلة:
              {{ enrollment.stage_name }}
            </p>

            <!-- Footer -->
            <div class="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
              <span class="text-sm text-gray-400"> عرض النتائج </span>

              <span
                class="text-gray-300 group-hover:text-[#232A7E] group-hover:-translate-x-1 transition"
              >
                ←
              </span>
            </div>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
