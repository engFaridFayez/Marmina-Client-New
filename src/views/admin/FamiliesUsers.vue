<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();

onMounted(async () => {
  await authStore.getFamilyById(Number(route.params.id));
});

const family = computed(() => authStore.selectedFamily);

const sortedUsers = computed(() => {
  if (!family.value?.users) return [];

  const order: Record<string, number> = {
    "امين اسرة": 1,
    "خادم عادي": 2,
    مخدوم: 3,
  };

  return [...family.value.users].sort((a, b) => order[a.role] - order[b.role]);
});
</script>

<template>
  <div
    v-if="family"
    class="bg-white rounded-4xl shadow-lg border border-[#ECE7DA] overflow-hidden"
    dir="rtl"
  >
    <!-- Header -->
    <div class="bg-linear-to-r from-[#232A7E] to-[#3a44a8] p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-4xl font-black">
            {{ family.name }}
          </h3>

          <p class="text-white/70 mt-1 text-2xl">
            {{ family.year }}
          </p>
        </div>

        <div
          class="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-center"
        >
          <p class="text-xs text-white/70 mb-0.5">عدد الأعضاء</p>

          <p class="text-3xl font-black">
            {{ family.users?.length }}
          </p>
        </div>
      </div>
    </div>

    <!-- Users -->
    <div class="p-6">
      <h4 class="text-xl font-bold text-[#232A7E] mb-4">أعضاء الأسرة</h4>

      <div class="space-y-3">
        <div
          v-for="member in sortedUsers"
          :key="member.id"
          class="flex items-center gap-4 bg-[#FAF8F3] border border-[#EEE6D5] rounded-2xl px-5 py-4 hover:border-[#D0A633] transition"
        >
          <!-- Avatar -->
          <div
            class="w-11 h-11 rounded-full bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center overflow-hidden"
          >
            <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />

            <span v-else class="text-white font-bold text-sm">
              {{ member.full_name?.charAt(0) }}
            </span>
          </div>

          <!-- Info -->
          <div class="flex-1">
            <p class="font-bold text-[#232A7E] text-xl">
              {{ member.full_name }}
            </p>

            <p class="text-lg text-gray-400">
              {{ member.username }}
            </p>
          </div>

          <!-- Role -->
          <span
            class="shrink-0 text-lg font-semibold px-3 py-1 rounded-full"
            :class="{
              'bg-[#232A7E]/10 text-[#232A7E]': member.role === 'امين اسرة',

              'bg-[#D0A633]/10 text-[#9a7820]': member.role === 'خادم عادي',

              'bg-gray-100 text-gray-500': member.role === 'مخدوم',
            }"
          >
            {{ member.role }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
