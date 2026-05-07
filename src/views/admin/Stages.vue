<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const auth = useAuthStore();

const selectedStage = ref<any | null>(null);

onMounted(() => {
  auth.getStages();
});

const goToFamilies = (stageId: number) => {
  router.push(`/families/${stageId}`);
};

const goToFamiliesUser = () =>{
  router.push('/families')
}
</script>

<template>
  <div class="p-6 bg-gray-100 min-h-screen">
    <!-- Header -->
    <h1 class="text-2xl font-bold mb-6 text-gray-800">📚 المراحل</h1>

    <!-- Loading -->
    <div v-if="auth.loading" class="text-gray-500">جاري التحميل...</div>

    <!-- Stages -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="stage in auth.stages"
        :key="stage.id"
        class="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 border border-gray-100"
      >
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-blue-700">
            {{ stage.name }}
          </h2>

          <span class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {{ stage.families?.length || 0 }} أسر
          </span>
        </div>

        <!-- Families Preview -->
        <div class="space-y-2 mb-4">
          <div
            v-for="family in stage.families?.slice(0, 3)"
            :key="family.id"
            class="text-gray-600 text-sm bg-gray-50 p-2 rounded-lg"
          >
            👨‍👩‍👧 {{ family.name }}
          </div>

          <div v-if="(stage.families?.length || 0) > 3" class="text-xs text-gray-400">
            + {{ stage.families!.length - 3 }} أسر أخرى
          </div>
        </div>

        <!-- Button -->
        <button
          @click="goToFamilies(stage.id)"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
        >
          عرض الأسر
        </button>
      </div>
    </div>

    <!-- Selected Stage Families -->
    <div v-if="selectedStage" class="mt-10">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-3xl font-bold text-gray-800">👨‍👩‍👧 أسر {{ selectedStage.name }}</h2>

        <button
          @click="selectedStage = null"
          class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          إغلاق
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="family in selectedStage.families"
          :key="family.id"
          class="bg-white p-5 rounded-2xl shadow border border-gray-100 hover:shadow-lg transition"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-gray-800">
              {{ family.name }}
            </h3>

            <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
              👨‍👩‍👧
            </div>
          </div>

          <div class="space-y-2 text-sm text-gray-600">
            <p>
              📘 السنة:
              <span class="font-semibold">
                {{ family.year }}
              </span>
            </p>

            <p>
              🏫 المرحلة:
              <span class="font-semibold">
                {{ selectedStage.name }}
              </span>
            </p>
          </div>

          <button
            class="mt-5 w-full bg-gray-900 hover:bg-black text-white py-2 rounded-xl transition"
          >
            دخول الأسرة
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
