<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";
import type { ExamWrite } from "@/types/results";

const route = useRoute();
const router = useRouter();
const resultStore = useResultStore();

const examId = computed(() => {
  const id = route.params.examId;
  return id ? Number(id) : null;
});

const isEditMode = computed(() => examId.value !== null);

const name = ref("");
const year = ref("");

const pageLoading = ref(false);
const submitting = ref(false);
const localError = ref<string | null>(null);


// =====================================
// Load
// =====================================

onMounted(async () => {
  pageLoading.value = true;
  localError.value = null;

  try {
    await resultStore.getExamsList();

    if (isEditMode.value && examId.value) {
      const exam = resultStore.exams.find(
        item => item.id === examId.value
      );

      if (!exam) {
        localError.value = "لم يتم العثور على الامتحان المطلوب";
        return;
      }

      name.value = exam.name;
      year.value = exam.year;
    }
  } catch (error) {
    localError.value =
      "حدث خطأ أثناء تحميل بيانات الامتحان";
  } finally {
    pageLoading.value = false;
  }
});


// =====================================
// Validation
// =====================================

const validate = () => {
  if (!name.value.trim()) {
    localError.value = "من فضلك أدخل اسم الامتحان";
    return false;
  }

  if (!year.value.trim()) {
    localError.value = "من فضلك أدخل السنة الدراسية";
    return false;
  }

  return true;
};


// =====================================
// Submit
// =====================================

const submit = async () => {
  localError.value = null;

  if (!validate()) return;

  submitting.value = true;

  try {
    const data: ExamWrite = {
      name: name.value.trim(),
      year: year.value.trim(),
    };

    if (isEditMode.value && examId.value) {
      await resultStore.updateExam(
        examId.value,
        data
      );
    } else {
      await resultStore.createExam(data);
    }

    router.push("/admin/results/exams");
  } catch (error) {
    localError.value =
      resultStore.error ??
      "حدث خطأ أثناء حفظ الامتحان";
  } finally {
    submitting.value = false;
  }
};


// =====================================
// Cancel
// =====================================

const cancel = () => {
  router.push("/admin/results/exams");
};
</script>


<template>
  <div
    dir="rtl"
    class="max-w-2xl mx-auto space-y-6"
  >

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
          {{ isEditMode ? "تعديل الامتحان" : "إضافة امتحان" }}
        </h1>

        <p class="text-gray-500 mt-1">
          {{
            isEditMode
              ? "تعديل بيانات الامتحان"
              : "إضافة امتحان جديد إلى النظام"
          }}
        </p>
      </div>

    </div>


    <!-- Loading -->
    <div
      v-if="pageLoading"
      class="bg-white rounded-2xl border border-gray-100 p-12 text-center"
    >
      <div class="text-4xl mb-4">
        ⏳
      </div>

      <p class="text-gray-400">
        جاري تحميل البيانات...
      </p>
    </div>


    <!-- Form -->
    <form
      v-else
      @submit.prevent="submit"
      class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6"
    >

      <!-- Error -->
      <div
        v-if="localError"
        class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4"
      >
        ⚠️ {{ localError }}
      </div>


      <!-- Exam Name -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">
          اسم الامتحان
        </label>

        <input
          v-model="name"
          type="text"
          placeholder="مثال: امتحان نصف العام"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#232A7E] transition"
        />
      </div>


      <!-- Academic Year -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">
          السنة الدراسية
        </label>

        <input
          v-model="year"
          type="text"
          placeholder="مثال: 2026-2027"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#232A7E] transition"
        />

        <p class="text-xs text-gray-400 mt-2">
          أدخل السنة الدراسية الخاصة بالامتحان
        </p>
      </div>


      <!-- Preview -->
      <div
        v-if="name || year"
        class="bg-[#F5F2E8] rounded-xl p-4"
      >

        <p class="text-xs text-gray-500 mb-1">
          معاينة
        </p>

        <p class="font-bold text-[#232A7E]">
          {{ name || "اسم الامتحان" }}
        </p>

        <p
          v-if="year"
          class="text-sm text-gray-500 mt-1"
        >
          السنة الدراسية: {{ year }}
        </p>

      </div>


      <!-- Buttons -->
      <div
        class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100"
      >

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
          {{
            submitting
              ? "جاري الحفظ..."
              : isEditMode
                ? "حفظ التعديل"
                : "إضافة الامتحان"
          }}
        </button>

      </div>

    </form>

  </div>
</template>
