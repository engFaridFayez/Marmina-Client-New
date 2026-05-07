<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();
const route = useRoute();

onMounted(async () => {
  if (!auth.stages.length) {
    await auth.getStages();
  }
});

const stage = computed(() => {
  return auth.stages.find((s) => s.id === Number(route.params.id));
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6" dir="rtl">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-blue-700">📚 {{ stage?.name }}</h1>

      <p class="text-gray-500 mt-2">جميع الأسر الموجودة داخل المرحلة</p>
    </div>

    <!-- Families -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="family in stage?.families"
        :key="family.id"
        class="bg-white rounded-2xl p-5 shadow border border-gray-100 hover:shadow-lg transition"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">
            {{ family.name }}
          </h2>

          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
            👨‍👩‍👧
          </div>
        </div>

        <div class="space-y-2 text-gray-600">
          <p>
            📘 السنة:
            <span class="font-semibold">
              {{ family.year }}
            </span>
          </p>

          <p>
            🏫 المرحلة:
            <span class="font-semibold">
              {{ stage?.name }}
            </span>
          </p>
        </div>

        <router-link :to="`/family/${family.id}`">
          <button
            class="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
          >
            دخول الأسرة
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>
