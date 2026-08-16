<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";

const router = useRouter();
const resultStore = useResultStore();

onMounted(async () => {
  await resultStore.getExamsList();
});

const goToCreate = () => {
  router.push("/admin/results/exams/new");
};

const goToEdit = (examId: number) => {
  router.push(`/admin/results/exams/${examId}/edit`);
};

const deleteExam = async (examId: number) => {
  if (!confirm("هل أنت متأكد من حذف هذا الامتحان؟")) return;

  await resultStore.deleteExam(examId);
};
</script>

<template>
  <div dir="rtl" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-[#232A7E]">الامتحانات</h1>

        <p class="text-gray-500 mt-2">متابعة الامتحانات والسنوات الدراسية</p>
      </div>

      <button
        @click="goToCreate"
        class="px-5 py-3 rounded-xl bg-[#232A7E] text-white hover:bg-[#1b2168] transition"
      >
        + إضافة امتحان
      </button>
    </div>

    <!-- Loading -->
    <div v-if="resultStore.loading" class="bg-white rounded-2xl p-10 text-center text-gray-400">
      جاري تحميل الامتحانات...
    </div>

    <!-- Error -->
    <div
      v-else-if="resultStore.error"
      class="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5"
    >
      {{ resultStore.error }}
    </div>

    <!-- Empty -->
    <div
      v-else-if="resultStore.exams.length === 0"
      class="bg-white rounded-2xl p-10 text-center text-gray-400"
    >
      لا توجد امتحانات مسجلة حاليًا
    </div>

    <!-- Exams -->
    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
      <div
        v-for="exam in resultStore.exams"
        :key="exam.id"
        class="flex items-center justify-between border border-gray-100 rounded-xl p-4 hover:shadow-sm transition"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-[#F5F2E8] text-[#232A7E] flex items-center justify-center text-xl"
          >
            📝
          </div>

          <div>
            <h4 class="font-bold text-gray-800">
              {{ exam.name }}
            </h4>
            <p class="text-sm text-gray-400 mt-1">السنة الدراسية: {{ exam.year }}</p>
          </div>
        </div>

        <span class="px-3 py-1 rounded-full bg-[#F5F2E8] text-[#232A7E] text-sm font-bold">
          {{ exam.year }}
        </span>
        <div class="flex items-center gap-2">
          <button
            @click="goToEdit(exam.id)"
            class="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
            title="تعديل"
          >
            ✏️
          </button>

          <button
            @click="deleteExam(exam.id)"
            :disabled="resultStore.loading"
            class="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center disabled:opacity-40"
            title="حذف"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
