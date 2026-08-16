<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";

const props = defineProps<{ componentExamId?: string }>();

const route = useRoute();
const router = useRouter();
const resultStore = useResultStore();

const isEdit = computed(() => !!props.componentExamId);
const componentExamIdNum = computed(() => Number(props.componentExamId));

const selectedSubjectId = ref<number | null>(null);
const selectedComponentId = ref<number | null>(null);
const selectedExamId = ref<number | null>(null);
const maxGrade = ref<number | null>(null);
const successGrade = ref<number | null>(null);

const saving = ref(false);
const formError = ref("");
const loadingComponents = ref(false);

onMounted(async () => {
  if (resultStore.subjects.length === 0) {
    await resultStore.getSubjectsList();
  }

  if (resultStore.exams.length === 0) {
    await resultStore.getExamsList();
  }

  if (isEdit.value) {
    const existing = resultStore.componentExams.find(
      (ce) => ce.id === componentExamIdNum.value
    );

    if (existing) {
      selectedComponentId.value = existing.component;
      selectedExamId.value = existing.exam;
      maxGrade.value = existing.max_grade;
      successGrade.value = existing.success_grade;

      // find the owning subject by name to preselect the subject dropdown
      const matchingSubject = resultStore.subjects.find(
        (s) => s.name === existing.subject_name
      );

      if (matchingSubject) {
        selectedSubjectId.value = matchingSubject.id;
        loadingComponents.value = true;
        await resultStore.getSubjectComponents(matchingSubject.id);
        loadingComponents.value = false;
      }
    }
  } else {
    const examFromQuery = route.query.exam;

    if (examFromQuery) {
      selectedExamId.value = Number(examFromQuery);
    }
  }
});

watch(selectedSubjectId, async (subjectId) => {
  if (isEdit.value) return;

  selectedComponentId.value = null;

  if (subjectId) {
    loadingComponents.value = true;
    await resultStore.getSubjectComponents(subjectId);
    loadingComponents.value = false;
  }
});

const goBack = () => {
  router.push("/admin/results/component-exams");
};

const submit = async () => {
  formError.value = "";

  if (!selectedComponentId.value || !selectedExamId.value || maxGrade.value === null) {
    formError.value = "يرجى ملء جميع الحقول المطلوبة";
    return;
  }

  if (successGrade.value !== null && successGrade.value > maxGrade.value) {
    formError.value = "درجة النجاح لا يمكن أن تتجاوز الدرجة القصوى";
    return;
  }

  saving.value = true;

  try {
    if (isEdit.value) {
      await resultStore.updateComponentExam(componentExamIdNum.value, {
        max_grade: maxGrade.value,
        success_grade: successGrade.value,
      });
    } else {
      await resultStore.createComponentExam({
        component: selectedComponentId.value,
        exam: selectedExamId.value,
        max_grade: maxGrade.value,
        success_grade: successGrade.value,
      });
    }

    goBack();
  } catch {
    formError.value = resultStore.error || "حدث خطأ أثناء الحفظ";
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <div dir="rtl" class="space-y-6 max-w-xl">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <button
        @click="goBack"
        class="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
      >
        ←
      </button>

      <div>
        <h1 class="text-2xl font-bold text-[#232A7E]">
          {{ isEdit ? "تعديل درجة جزء" : "إضافة درجة جزء" }}
        </h1>
        <p class="text-gray-500 mt-1">تحديد الدرجة القصوى ودرجة النجاح للجزء في الامتحان</p>
      </div>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div v-if="formError" class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm">
        {{ formError }}
      </div>

      <!-- Subject / Component pickers (create only) -->
      <template v-if="!isEdit">
        <div>
          <label class="block text-sm font-bold text-gray-600 mb-2">المادة</label>
          <select
            v-model.number="selectedSubjectId"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#232A7E]/30"
          >
            <option :value="null" disabled>اختر المادة</option>
            <option v-for="subject in resultStore.subjects" :key="subject.id" :value="subject.id">
              {{ subject.name }}
            </option>
          </select>
        </div>

        <div v-if="selectedSubjectId">
          <label class="block text-sm font-bold text-gray-600 mb-2">الجزء</label>

          <div v-if="loadingComponents" class="text-sm text-gray-400 py-2">جاري التحميل...</div>

          <div v-else-if="resultStore.subjectComponents.length === 0" class="text-sm text-gray-400 py-2">
            لا توجد أجزاء مسجلة لهذه المادة
          </div>

          <select
            v-else
            v-model.number="selectedComponentId"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#232A7E]/30"
          >
            <option :value="null" disabled>اختر الجزء</option>
            <option
              v-for="component in resultStore.subjectComponents"
              :key="component.id"
              :value="component.id"
            >
              {{ component.name }}
            </option>
          </select>
        </div>
      </template>

      <div v-else>
        <label class="block text-sm font-bold text-gray-600 mb-1">الجزء</label>
        <p class="text-gray-800 font-semibold">
          {{ resultStore.componentExams.find((ce) => ce.id === componentExamIdNum)?.subject_name }}
          -
          {{ resultStore.componentExams.find((ce) => ce.id === componentExamIdNum)?.component_name }}
        </p>
      </div>

      <!-- Exam picker (create only) -->
      <div v-if="!isEdit">
        <label class="block text-sm font-bold text-gray-600 mb-2">الامتحان</label>
        <select
          v-model.number="selectedExamId"
          class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#232A7E]/30"
        >
          <option :value="null" disabled>اختر الامتحان</option>
          <option v-for="exam in resultStore.exams" :key="exam.id" :value="exam.id">
            {{ exam.name }} · {{ exam.year }}
          </option>
        </select>
      </div>

      <div v-else>
        <label class="block text-sm font-bold text-gray-600 mb-1">الامتحان</label>
        <p class="text-gray-800 font-semibold">
          {{ resultStore.exams.find((e) => e.id === selectedExamId)?.name }}
        </p>
      </div>

      <!-- Grades -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-bold text-gray-600 mb-2">الدرجة القصوى</label>
          <input
            v-model.number="maxGrade"
            type="number"
            min="0"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#232A7E]/30"
          />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-600 mb-2">درجة النجاح</label>
          <input
            v-model.number="successGrade"
            type="number"
            min="0"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#232A7E]/30"
          />
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button
          @click="goBack"
          class="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-600 font-bold hover:bg-gray-200 transition"
        >
          إلغاء
        </button>

        <button
          @click="submit"
          :disabled="saving"
          class="px-6 py-2.5 rounded-xl bg-[#232A7E] text-white font-bold disabled:opacity-40 hover:bg-[#1b2263] transition"
        >
          {{ saving ? "جاري الحفظ..." : "حفظ" }}
        </button>
      </div>
    </div>
  </div>
</template>
