<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";

const router = useRouter();
const resultStore = useResultStore();

const selectedSubjectId = ref<number | null>(null);
const deletingId = ref<number | null>(null);

onMounted(async () => {
  if (resultStore.subjects.length === 0) {
    await resultStore.getSubjectsList();
  }

  const firstSubject = resultStore.subjects[0];

  if (firstSubject) {
    selectedSubjectId.value = firstSubject.id;
    await resultStore.getSubjectComponents(firstSubject.id);
  }
});

const onSubjectChange = async (subjectId: number) => {
  selectedSubjectId.value = subjectId;
  await resultStore.getSubjectComponents(subjectId);
};

const goToCreate = () => {
  if (!selectedSubjectId.value) return;
  router.push(`/admin/results/subject-components/new?subject=${selectedSubjectId.value}`);
};

const goToEdit = (componentId: number) => {
  router.push(`/admin/results/subject-components/${componentId}/edit`);
};

const removeComponent = async (componentId: number) => {
  if (!confirm("هل أنت متأكد من حذف هذا الجزء؟")) return;

  deletingId.value = componentId;

  try {
    await resultStore.deleteSubjectComponent(componentId);
  } finally {
    deletingId.value = null;
  }
};

const selectedSubject = computed(() =>
  resultStore.subjects.find((s) => s.id === selectedSubjectId.value),
);
</script>

<template>
  <div dir="rtl" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-[#232A7E]">أجزاء المواد</h1>
        <p class="text-gray-500 mt-2">إدارة الأجزاء التابعة لكل مادة (مثل مزامير الأجبية)</p>
      </div>

      <button
        @click="goToCreate"
        :disabled="!selectedSubjectId"
        class="px-5 py-2.5 rounded-xl bg-[#232A7E] text-white font-bold hover:bg-[#1b2263] transition disabled:opacity-40"
      >
        + إضافة جزء
      </button>
    </div>

    <!-- Subject filter -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <label class="block text-sm font-bold text-gray-600 mb-3">المادة</label>

      <div class="flex flex-wrap gap-3">
        <button
          v-for="subject in resultStore.subjects"
          :key="subject.id"
          @click="onSubjectChange(subject.id)"
          class="px-4 py-2 rounded-xl border text-sm font-bold transition"
          :class="
            selectedSubjectId === subject.id
              ? 'border-[#232A7E] bg-[#F5F2E8] text-[#232A7E]'
              : 'border-gray-100 text-gray-500 hover:shadow-sm'
          "
        >
          {{ subject.name }}
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
      v-else-if="resultStore.subjectComponents.length === 0"
      class="bg-white rounded-2xl p-10 text-center text-gray-400"
    >
      <span v-if="selectedSubject">لا توجد أجزاء مسجلة لمادة {{ selectedSubject.name }} بعد</span>
      <span v-else>اختر مادة لعرض أجزائها</span>
    </div>

    <!-- List -->
    <div v-else class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
      <div
        v-for="component in resultStore.subjectComponents"
        :key="component.id"
        class="flex items-center justify-between border border-gray-100 rounded-xl p-4"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-xl bg-[#F5F2E8] text-[#232A7E] flex items-center justify-center text-xl"
          >
            🎵
          </div>

          <div>
            <h4 class="font-bold text-gray-800">{{ component.name }}</h4>
            <p class="text-sm text-gray-400 mt-1">{{ component.subject_name }}</p>
          </div>
        </div>

        <div class="flex gap-2">
          <button
            @click="goToEdit(component.id)"
            class="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center text-sm"
            title="تعديل"
          >
            ✏️
          </button>

          <button
            @click="removeComponent(component.id)"
            :disabled="deletingId === component.id"
            class="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 text-red-500 transition flex items-center justify-center text-sm disabled:opacity-40"
            title="حذف"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
