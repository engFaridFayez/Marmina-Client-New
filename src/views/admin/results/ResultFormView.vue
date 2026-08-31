<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";
import type { ResultWrite } from "@/types/results";

const route = useRoute();
const router = useRouter();
const resultStore = useResultStore();

const enrollmentId = Number(route.params.enrollmentId);

const resultId = computed(() => {
  const id = route.params.resultId;

  return id ? Number(id) : null;
});

const isEditMode = computed(() => resultId.value !== null);

const selectedType = ref<"subject" | "component">("subject");
const selectedExamId = ref<number | null>(null);
const selectedSubjectExamId = ref<number | null>(null);
const selectedComponentExamId = ref<number | null>(null);

const points = ref<number | null>(null);

const submitting = ref(false);
const pageLoading = ref(false);
const localError = ref<string | null>(null);

// =====================================
// Computed
// =====================================

const selectedSubjectExam = computed(() => {
  if (!selectedSubjectExamId.value) return null;

  return resultStore.subjectExams.find((item) => item.id === selectedSubjectExamId.value) ?? null;
});

const selectedComponentExam = computed(() => {
  if (!selectedComponentExamId.value) return null;

  return (
    resultStore.componentExams.find((item) => item.id === selectedComponentExamId.value) ?? null
  );
});

const selectedMaxGrade = computed(() => {
  if (selectedType.value === "subject") {
    return selectedSubjectExam.value?.max_grade ?? null;
  }

  return selectedComponentExam.value?.max_grade ?? null;
});

const selectedSuccessGrade = computed(() => {
  if (selectedType.value === "subject") {
    return selectedSubjectExam.value?.success_grade ?? null;
  }

  return selectedComponentExam.value?.success_grade ?? null;
});

const selectedExam = computed(() => {
  if (!selectedExamId.value) return null;

  return resultStore.exams.find((exam) => exam.id === selectedExamId.value) ?? null;
});

const availableSubjectExams = computed(() => {
  if (!selectedExamId.value) {
    return resultStore.subjectExams;
  }

  return resultStore.subjectExams.filter((item) => item.exam === selectedExamId.value);
});

const availableComponentExams = computed(() => {
  if (!selectedExamId.value) {
    return resultStore.componentExams;
  }

  return resultStore.componentExams.filter((item) => item.exam === selectedExamId.value);
});

// =====================================
// Load data
// =====================================

onMounted(async () => {
  pageLoading.value = true;
  localError.value = null;

  try {
    await Promise.all([
      resultStore.getExamsList(),
      resultStore.getSubjectExams(),
      resultStore.getComponentExams(),
    ]);

    // =====================================
    // Edit mode
    // =====================================

    if (isEditMode.value && resultId.value) {
      await resultStore.getEnrollmentResults(enrollmentId);

      const result = resultStore.enrollmentResults.find((item) => item.id === resultId.value);

      if (!result) {
        localError.value = "لم يتم العثور على النتيجة المطلوبة";
        return;
      }

      points.value = result.points;

      // Find matching subject exam
      const subjectExam = resultStore.subjectExams.find(
        (item) => item.subject_name === result.subject && item.exam_name === result.exam,
      );

      if (subjectExam) {
        selectedType.value = "subject";
        selectedSubjectExamId.value = subjectExam.id;
        selectedExamId.value = subjectExam.exam;
      }

      // Find matching component exam
      const componentExam = resultStore.componentExams.find(
        (item) => item.component_name === result.component && item.exam_name === result.exam,
      );

      if (componentExam) {
        selectedType.value = "component";
        selectedComponentExamId.value = componentExam.id;
        selectedExamId.value = componentExam.exam;
      }
    } else {
      // =====================================
      // Create mode
      // =====================================

      const firstExam = resultStore.exams[0];

      if (firstExam) {
        selectedExamId.value = firstExam.id;
      }
    }
  } catch (error) {
    localError.value = "حدث خطأ أثناء تحميل البيانات";
  } finally {
    pageLoading.value = false;
  }
});

// =====================================
// Change type
// =====================================

const changeType = (type: "subject" | "component") => {
  selectedType.value = type;

  selectedSubjectExamId.value = null;
  selectedComponentExamId.value = null;
  points.value = null;
};

// =====================================
// Change exam
// =====================================

const changeExam = async () => {
  selectedSubjectExamId.value = null;
  selectedComponentExamId.value = null;

  points.value = null;

  if (!selectedExamId.value) return;

  await Promise.all([
    resultStore.getSubjectExams({
      exam: selectedExamId.value,
    }),
    resultStore.getComponentExams({
      exam: selectedExamId.value,
    }),
  ]);
};

// =====================================
// Submit
// =====================================

const submit = async () => {
  localError.value = null;

  if (!points.value && points.value !== 0) {
    localError.value = "من فضلك أدخل درجة المخدوم";
    return;
  }

  if (points.value < 0) {
    localError.value = "الدرجة لا يمكن أن تكون أقل من صفر";
    return;
  }

  if (selectedMaxGrade.value !== null && points.value > selectedMaxGrade.value) {
    localError.value = `الدرجة لا يمكن أن تتجاوز ${selectedMaxGrade.value}`;
    return;
  }

  if (!isEditMode.value && selectedType.value === "subject" && !selectedSubjectExamId.value) {
    localError.value = "من فضلك اختر المادة والامتحان";
    return;
  }

  if (!isEditMode.value && selectedType.value === "component" && !selectedComponentExamId.value) {
    localError.value = "من فضلك اختر المكوّن والامتحان";
    return;
  }

  submitting.value = true;

  try {
    if (isEditMode.value && resultId.value) {
      await resultStore.updateResult(resultId.value, {
        points: points.value,
      });

      router.push(`/admin/results/enrollments/${enrollmentId}`);

      return;
    }

    const data: ResultWrite = {
      points: points.value,
    };

    if (selectedType.value === "subject") {
      data.subject_exam = selectedSubjectExamId.value!;
    } else {
      data.component_exam = selectedComponentExamId.value!;
    }

    await resultStore.addResult(enrollmentId, data);

    router.push(`/admin/results/enrollments/${enrollmentId}`);
  } catch (error) {
    localError.value = resultStore.error ?? "حدث خطأ أثناء حفظ النتيجة";
  } finally {
    submitting.value = false;
  }
};

// =====================================
// Cancel
// =====================================

const cancel = () => {
  router.push(`/admin/results/enrollments/${enrollmentId}`);
};
</script>

<template>
  <div dir="rtl" class="max-w-3xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <button
        @click="cancel"
        class="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
      >
        ←
      </button>

      <div>
        <h1 class="text-2xl font-bold text-[#232A7E]">
          {{ isEditMode ? "تعديل النتيجة" : "إضافة نتيجة" }}
        </h1>

        <p class="text-gray-500 mt-1">
          {{ isEditMode ? "تعديل درجة المخدوم" : "تسجيل درجة جديدة للمخدوم" }}
        </p>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="pageLoading" class="bg-white rounded-2xl border border-gray-100 p-12 text-center">
      <div class="text-4xl mb-4">⏳</div>

      <p class="text-gray-400">جاري تحميل البيانات...</p>
    </div>

    <!-- Form -->
    <form
      v-else
      @submit.prevent="submit"
      class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6"
    >
      <!-- Error -->
      <div v-if="localError" class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4">
        ⚠️ {{ localError }}
      </div>

      <!-- Type -->
      <div v-if="!isEditMode">
        <label class="block text-sm font-bold text-gray-700 mb-3"> نوع النتيجة </label>

        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="changeType('subject')"
            class="rounded-xl border p-4 text-right transition"
            :class="
              selectedType === 'subject'
                ? 'border-[#232A7E] bg-[#F5F2E8] text-[#232A7E]'
                : 'border-gray-200 hover:border-gray-300'
            "
          >
            <div class="font-bold">📖 مادة</div>

            <div class="text-xs text-gray-400 mt-1">درجة مادة كاملة</div>
          </button>

          <button
            type="button"
            @click="changeType('component')"
            class="rounded-xl border p-4 text-right transition"
            :class="
              selectedType === 'component'
                ? 'border-[#232A7E] bg-[#F5F2E8] text-[#232A7E]'
                : 'border-gray-200 hover:border-gray-300'
            "
          >
            <div class="font-bold">🎵 مكوّن</div>

            <div class="text-xs text-gray-400 mt-1">مثل المزمور أو جزء من المادة</div>
          </button>
        </div>
      </div>

      <!-- Exam -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2"> الامتحان </label>

        <select
          v-model.number="selectedExamId"
          @change="changeExam"
          :disabled="isEditMode"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#232A7E] disabled:bg-gray-100"
        >
          <option :value="null">اختر الامتحان</option>

          <option v-for="exam in resultStore.exams" :key="exam.id" :value="exam.id">
            {{ exam.name }} · {{ exam.year }}
          </option>
        </select>
      </div>

      <!-- Subject Exam -->
      <div v-if="selectedType === 'subject'">
        <label class="block text-sm font-bold text-gray-700 mb-2"> المادة </label>

        <select
          v-model.number="selectedSubjectExamId"
          :disabled="isEditMode"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#232A7E] disabled:bg-gray-100"
        >
          <option :value="null">اختر المادة</option>

          <option v-for="item in availableSubjectExams" :key="item.id" :value="item.id">
            {{ item.subject_name }}
            — الدرجة القصوى {{ item.max_grade }}
          </option>
        </select>
      </div>

      <!-- Component Exam -->
      <div v-else>
        <label class="block text-sm font-bold text-gray-700 mb-2"> المكوّن </label>

        <select
          v-model.number="selectedComponentExamId"
          :disabled="isEditMode"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#232A7E] disabled:bg-gray-100"
        >
          <option :value="null">اختر المكوّن</option>

          <option v-for="item in availableComponentExams" :key="item.id" :value="item.id">
            {{ item.subject_name }}
            — {{ item.component_name }} — الدرجة القصوى {{ item.max_grade }}
          </option>
        </select>
      </div>

      <!-- Grade info -->
      <div v-if="selectedMaxGrade !== null" class="grid grid-cols-2 gap-3">
        <div class="bg-[#F5F2E8] rounded-xl p-4">
          <p class="text-xs text-gray-500">الدرجة القصوى</p>

          <p class="text-xl font-bold text-[#232A7E] mt-1">
            {{ selectedMaxGrade }}
          </p>
        </div>

        <div class="bg-green-50 rounded-xl p-4">
          <p class="text-xs text-gray-500">درجة النجاح</p>

          <p class="text-xl font-bold text-green-600 mt-1">
            {{ selectedSuccessGrade ?? "—" }}
          </p>
        </div>
      </div>

      <!-- Points -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2"> درجة المخدوم </label>

        <input
          v-model.number="points"
          type="number"
          min="0"
          :max="selectedMaxGrade ?? undefined"
          step="0.01"
          placeholder="أدخل درجة المخدوم"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#232A7E]"
        />

        <p class="text-xs text-gray-400 mt-2">أدخل الدرجة التي حصل عليها المخدوم في هذا الامتحان</p>
      </div>

      <!-- Buttons -->
      <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          @click="cancel"
          class="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition"
        >
          إلغاء
        </button>

        <button
          type="submit"
          :disabled="submitting"
          class="px-6 py-2.5 rounded-xl bg-[#232A7E] hover:bg-[#1b2263] text-white font-bold transition disabled:opacity-40"
        >
          {{ submitting ? "جاري الحفظ..." : isEditMode ? "حفظ التعديل" : "إضافة النتيجة" }}
        </button>
      </div>
    </form>
  </div>
</template>
