<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";

const router = useRouter();
const resultStore = useResultStore();

onMounted(async () => {
  await resultStore.getSubjectsList();
});

const goToCreate = () => {
  router.push("/admin/results/subjects/new");
};

const goToEdit = (subjectId: number) => {
  router.push(`/admin/results/subjects/${subjectId}/edit`);
};

const deleteSubject = async (subjectId: number) => {
  if (!confirm("هل أنت متأكد من حذف هذه المادة؟")) return;

  await resultStore.deleteSubject(subjectId);
};
</script>

<template>
  <div dir="rtl" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-[#232A7E]">المواد الدراسية</h1>

        <p class="text-gray-500 mt-2">عرض المواد ودرجات النجاح</p>
      </div>

      <button
        @click="goToCreate"
        class="px-5 py-2.5 rounded-xl bg-[#232A7E] text-white font-bold hover:bg-[#1b2263] transition"
      >
        + إضافة مادة
      </button>
    </div>

    <!-- Loading -->
    <div v-if="resultStore.loading" class="bg-white rounded-2xl p-10 text-center text-gray-400">
      جاري تحميل المواد...
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
      v-else-if="resultStore.subjects.length === 0"
      class="bg-white rounded-2xl p-10 text-center text-gray-400"
    >
      لا توجد مواد مسجلة حاليًا
    </div>

    <!-- Subjects -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="subject in resultStore.subjects"
        :key="subject.id"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
      >
        <div
          class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#232A7E] to-[#4F46E5] text-white flex items-center justify-center text-2xl mb-5"
        >
          📚
        </div>

        <h2 class="text-xl font-bold text-[#232A7E]">
          {{ subject.name }}
        </h2>

        <div class="mt-5 pt-4 border-t border-gray-100 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">الدرجة النهائية</span>
            <span class="font-bold text-[#232A7E]">
              {{ subject.final_grade }}
            </span>
          </div>

          <div class="flex justify-between text-sm">
            <span class="text-gray-500">درجة النجاح</span>
            <span class="font-bold text-green-600">
              {{ subject.success_grade }}
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100">
          <button
            @click="goToEdit(subject.id)"
            class="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition"
          >
            ✏️ تعديل
          </button>

          <button
            @click="deleteSubject(subject.id)"
            :disabled="resultStore.loading"
            class="flex-1 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-500 font-bold transition disabled:opacity-40"
          >
            🗑️ حذف
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
