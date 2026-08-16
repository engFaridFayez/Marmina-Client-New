<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";

const router = useRouter();
const resultStore = useResultStore();

const selectedExamId = ref<number | null>(null);
const deletingId = ref<number | null>(null);

onMounted(async () => {
  await resultStore.getExamsList();

  const firstExam = resultStore.exams[0];

  if (firstExam) {
    selectedExamId.value = firstExam.id;
    await resultStore.getSubjectExams({ exam: firstExam.id });
  }
});

const onExamChange = async (examId: number) => {
  selectedExamId.value = examId;
  await resultStore.getSubjectExams({ exam: examId });
};

const goToCreate = () => {
  if (!selectedExamId.value) return;
  router.push(`/admin/results/subject-exams/new?exam=${selectedExamId.value}`);
};

const goToEdit = (subjectExamId: number) => {
  router.push(`/admin/results/subject-exams/${subjectExamId}/edit`);
};

const removeSubjectExam = async (subjectExamId: number) => {
  if (!confirm("هل أنت متأكد من حذف درجة هذه المادة؟")) return;

  deletingId.value = subjectExamId;

  try {
    await resultStore.deleteSubjectExam(subjectExamId);
  } finally {
    deletingId.value = null;
  }
};

const selectedExam = computed(() =>
  resultStore.exams.find((e) => e.id === selectedExamId.value)
);
</script>

<template>
  <div dir="rtl" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-[#232A7E]">درجات المواد لكل امتحان</h1>
        <p class="text-gray-500 mt-2">تحديد الدرجة القصوى ودرجة النجاح لكل مادة في كل امتحان</p>
      </div>

      <button
        @click="goToCreate"
        :disabled="!selectedExamId"
        class="px-5 py-2.5 rounded-xl bg-[#232A7E] text-white font-bold hover:bg-[#1b2263] transition disabled:opacity-40"
      >
        + إضافة درجة مادة
      </button>
    </div>

    <!-- Exam filter -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <label class="block text-sm font-bold text-gray-600 mb-3">الامتحان</label>

      <div class="flex flex-wrap gap-3">
        <button
          v-for="exam in resultStore.exams"
          :key="exam.id"
          @click="onExamChange(exam.id)"
          class="px-4 py-2 rounded-xl border text-sm font-bold transition"
          :class="
            selectedExamId === exam.id
              ? 'border-[#232A7E] bg-[#F5F2E8] text-[#232A7E]'
              : 'border-gray-100 text-gray-500 hover:shadow-sm'
          "
        >
          {{ exam.name }} · {{ exam.year }}
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="resultStore.loading" class="bg-white rounded-2xl p-10 text-center text-gray-400">
      جاري التحميل...
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
      v-else-if="resultStore.subjectExams.length === 0"
      class="bg-white rounded-2xl p-10 text-center text-gray-400"
    >
      <span v-if="selectedExam">لا توجد درجات مواد مسجلة لامتحان {{ selectedExam.name }} بعد</span>
      <span v-else>اختر امتحانًا لعرض درجات المواد</span>
    </div>

    <!-- List -->
    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
      <div
        v-for="subjectExam in resultStore.subjectExams"
        :key="subjectExam.id"
        class="flex items-center justify-between border border-gray-100 rounded-xl p-4"
      >
        <div>
          <h4 class="font-bold text-gray-800">{{ subjectExam.subject_name }}</h4>
          <p class="text-sm text-gray-400 mt-1">{{ subjectExam.exam_name }}</p>
        </div>

        <div class="flex items-center gap-6">
          <div class="text-sm text-left">
            <p class="text-gray-500">
              الدرجة القصوى:
              <span class="font-bold text-[#232A7E]">{{ subjectExam.max_grade }}</span>
            </p>
            <p class="text-gray-500 mt-1">
              درجة النجاح:
              <span class="font-bold text-green-600">
                {{ subjectExam.success_grade ?? "—" }}
              </span>
            </p>
          </div>

          <div class="flex gap-2">
            <button
              @click="goToEdit(subjectExam.id)"
              class="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-sm"
              title="تعديل"
            >
              ✏️
            </button>

            <button
              @click="removeSubjectExam(subjectExam.id)"
              :disabled="deletingId === subjectExam.id"
              class="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition flex items-center justify-center text-sm disabled:opacity-40"
              title="حذف"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
