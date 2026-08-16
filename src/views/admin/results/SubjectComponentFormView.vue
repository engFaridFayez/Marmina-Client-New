<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";

const props = defineProps<{ componentId?: string }>();

const route = useRoute();
const router = useRouter();
const resultStore = useResultStore();

const isEdit = computed(() => !!props.componentId);
const componentIdNum = computed(() => Number(props.componentId));

const selectedSubjectId = ref<number | null>(null);
const name = ref("");

const saving = ref(false);
const formError = ref("");

onMounted(async () => {
  if (resultStore.subjects.length === 0) {
    await resultStore.getSubjectsList();
  }

  if (isEdit.value) {
    const existing = resultStore.subjectComponents.find((c) => c.id === componentIdNum.value);

    if (existing) {
      selectedSubjectId.value = existing.subject;
      name.value = existing.name;
    }
  } else {
    const subjectFromQuery = route.query.subject;

    if (subjectFromQuery) {
      selectedSubjectId.value = Number(subjectFromQuery);
    }
  }
});

const goBack = () => {
  router.push("/admin/results/subject-components");
};

const submit = async () => {
  formError.value = "";

  if (!selectedSubjectId.value || !name.value.trim()) {
    formError.value = "يرجى ملء جميع الحقول";
    return;
  }

  saving.value = true;

  try {
    if (isEdit.value) {
      await resultStore.updateSubjectComponent(componentIdNum.value, {
        name: name.value.trim(),
      });
    } else {
      await resultStore.createSubjectComponent({
        subject: selectedSubjectId.value,
        name: name.value.trim(),
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
          {{ isEdit ? "تعديل جزء" : "إضافة جزء جديد" }}
        </h1>
        <p class="text-gray-500 mt-1">مثال: مزمور، تسبحة، حفظ آيات</p>
      </div>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div
        v-if="formError"
        class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm"
      >
        {{ formError }}
      </div>

      <!-- Subject picker (create only) -->
      <div v-if="!isEdit">
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

      <div v-else>
        <label class="block text-sm font-bold text-gray-600 mb-1">المادة</label>
        <p class="text-gray-800 font-semibold">
          {{ resultStore.subjects.find((s) => s.id === selectedSubjectId)?.name }}
        </p>
      </div>

      <!-- Name -->
      <div>
        <label class="block text-sm font-bold text-gray-600 mb-2">اسم الجزء</label>
        <input
          v-model="name"
          type="text"
          class="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#232A7E]/30"
          placeholder="مثال: مزمور 50"
        />
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
