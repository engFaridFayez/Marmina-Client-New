<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";
import type { SubjectWrite } from "@/types/results";

const route = useRoute();
const router = useRouter();
const resultStore = useResultStore();

const subjectId = computed(() => {
  const id = route.params.subjectId;
  return id ? Number(id) : null;
});

const isEditMode = computed(() => subjectId.value !== null);

const name = ref("");
const finalGrade = ref<number | null>(null);
const successGrade = ref<number | null>(null);

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
    await resultStore.getSubjectsList();

    if (isEditMode.value && subjectId.value) {
      const subject = resultStore.subjects.find(
        item => item.id === subjectId.value
      );

      if (!subject) {
        localError.value = "لم يتم العثور على المادة المطلوبة";
        return;
      }

      name.value = subject.name;
      finalGrade.value = subject.final_grade;
      successGrade.value = subject.success_grade;
    }
  } catch (error) {
    localError.value = "حدث خطأ أثناء تحميل بيانات المادة";
  } finally {
    pageLoading.value = false;
  }
});


// =====================================
// Validation
// =====================================

const validate = () => {
  if (!name.value.trim()) {
    localError.value = "من فضلك أدخل اسم المادة";
    return false;
  }

  if (finalGrade.value === null) {
    localError.value = "من فضلك أدخل الدرجة النهائية";
    return false;
  }

  if (finalGrade.value <= 0) {
    localError.value = "الدرجة النهائية يجب أن تكون أكبر من صفر";
    return false;
  }

  if (successGrade.value === null) {
    localError.value = "من فضلك أدخل درجة النجاح";
    return false;
  }

  if (successGrade.value < 0) {
    localError.value = "درجة النجاح لا يمكن أن تكون سالبة";
    return false;
  }

  if (successGrade.value > finalGrade.value) {
    localError.value =
      "درجة النجاح لا يمكن أن تكون أكبر من الدرجة النهائية";

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
    const data: SubjectWrite = {
      name: name.value.trim(),
      final_grade: finalGrade.value!,
      success_grade: successGrade.value!,
    };

    if (isEditMode.value && subjectId.value) {
      await resultStore.updateSubject(
        subjectId.value,
        data
      );
    } else {
      await resultStore.createSubject(data);
    }

    router.push("/admin/results/subjects");
  } catch (error) {
    localError.value =
      resultStore.error ??
      "حدث خطأ أثناء حفظ المادة";
  } finally {
    submitting.value = false;
  }
};


// =====================================
// Cancel
// =====================================

const cancel = () => {
  router.push("/admin/results/subjects");
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
          {{ isEditMode ? "تعديل المادة" : "إضافة مادة" }}
        </h1>

        <p class="text-gray-500 mt-1">
          {{
            isEditMode
              ? "تعديل بيانات المادة"
              : "إضافة مادة جديدة إلى النظام"
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


      <!-- Name -->
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">
          اسم المادة
        </label>

        <input
          v-model="name"
          type="text"
          placeholder="مثال: الألحان"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#232A7E] transition"
        />
      </div>


      <!-- Grades -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <!-- Final Grade -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">
            الدرجة النهائية
          </label>

          <input
            v-model.number="finalGrade"
            type="number"
            min="1"
            step="0.01"
            placeholder="مثال: 100"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#232A7E] transition"
          />

          <p class="text-xs text-gray-400 mt-2">
            الدرجة النهائية للمادة على مدار السنة
          </p>
        </div>


        <!-- Success Grade -->
        <div>
          <label class="block text-sm font-bold text-gray-700 mb-2">
            درجة النجاح
          </label>

          <input
            v-model.number="successGrade"
            type="number"
            min="0"
            :max="finalGrade ?? undefined"
            step="0.01"
            placeholder="مثال: 50"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-[#232A7E] transition"
          />

          <p class="text-xs text-gray-400 mt-2">
            أقل درجة يعتبر عندها الطالب ناجحًا
          </p>
        </div>

      </div>


      <!-- Preview -->
      <div
        v-if="finalGrade !== null || successGrade !== null"
        class="grid grid-cols-2 gap-3"
      >

        <div class="bg-[#F5F2E8] rounded-xl p-4">
          <p class="text-xs text-gray-500">
            الدرجة النهائية
          </p>

          <p class="text-xl font-bold text-[#232A7E] mt-1">
            {{ finalGrade ?? "—" }}
          </p>
        </div>


        <div class="bg-green-50 rounded-xl p-4">
          <p class="text-xs text-gray-500">
            درجة النجاح
          </p>

          <p class="text-xl font-bold text-green-600 mt-1">
            {{ successGrade ?? "—" }}
          </p>
        </div>

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
                : "إضافة المادة"
          }}
        </button>

      </div>

    </form>

  </div>
</template>
