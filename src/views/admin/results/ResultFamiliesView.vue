<script setup lang="ts">
import { onMounted } from "vue";
import { useResultStore } from "@/stores/results";

const resultStore = useResultStore();

onMounted(async () => {
  await resultStore.getResultFamilies();
});
</script>

<template>
  <div dir="rtl" class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-[#232A7E]">نتائج الأسر</h1>

      <p class="text-gray-500 mt-2">اختر الأسرة لعرض نتائج المخدومين التابعين لها</p>
    </div>

    <!-- Loading -->
    <div v-if="resultStore.loading" class="bg-white rounded-2xl p-10 text-center text-gray-400">
      جاري تحميل الأسر...
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
      v-else-if="resultStore.resultFamilies.length === 0"
      class="bg-white rounded-2xl p-10 text-center text-gray-400"
    >
      لا توجد أسر متاحة لك
    </div>

    <!-- Families -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <RouterLink
        v-for="family in resultStore.resultFamilies"
        :key="family.id"
        :to="`/admin/results/families/${family.id}`"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
      >
        <!-- Icon -->
        <div
          class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#232A7E] to-[#4F46E5] text-white flex items-center justify-center text-2xl mb-5"
        >
          👨‍👩‍👧‍👦
        </div>

        <!-- Name -->
        <h2 class="text-xl font-bold text-[#232A7E]">
          {{ family.name }}
        </h2>

        <!-- Stage -->
        <p class="text-gray-500 mt-2">
          المرحلة:
          <span class="font-semibold text-gray-700">
            {{ family.stage || "غير محددة" }}
          </span>
        </p>

        <!-- Year -->
        <p class="text-gray-500 mt-1">
          السنة:
          <span class="font-semibold text-gray-700">
            {{ family.year }}
          </span>
        </p>

        <!-- Students -->
        <div class="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span class="text-gray-500 text-sm"> عدد المخدومين </span>

          <span class="px-3 py-1 rounded-full bg-[#F5F2E8] text-[#232A7E] font-bold">
            {{ family.students_count }}
          </span>
        </div>
      </RouterLink>
    </div>
  </div>
</template>
