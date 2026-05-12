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

const leaders = computed(() => {
  if (!family.value?.users) return [];

  return family.value.users.filter(
    (member) =>
      member.role === "امين اسرة" ||
      member.role === "خادم عادي",
  );
});

const servants = computed(() => {
  if (!family.value?.users) return [];

  return family.value.users.filter(
    (member) => member.role === "مخدوم",
  );
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
          <p class="text-xs text-white/70 mb-0.5">
            عدد الأعضاء
          </p>

          <p class="text-3xl font-black">
            {{ family.users?.length }}
          </p>
        </div>
      </div>
    </div>

    <!-- Users -->
    <div class="p-6 space-y-10">
      <!-- Leaders Table -->
      <div>
        <h4 class="text-3xl font-black text-[#232A7E] mb-6">
          الخدام وأمناء الأسر
        </h4>

        <div
          v-if="leaders.length"
          class="overflow-hidden rounded-3xl border border-[#ECE7DA]"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between bg-linear-to-r from-[#232A7E] to-[#3a44a8] text-white px-8 py-5 font-black text-2xl"
          >
            <div>الاسم</div>
            <div>الدور</div>
          </div>

          <!-- Rows -->
          <div
            v-for="member in leaders"
            :key="member.id"
            class="flex items-center justify-between px-8 py-6 bg-[#FAF8F3] border-t border-[#EEE6D5] hover:bg-[#f5f0e7] transition"
          >
            <!-- Name -->
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-full bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="member.image"
                  :src="member.image"
                  class="w-full h-full object-cover"
                />

                <span
                  v-else
                  class="text-white font-bold text-lg"
                >
                  {{ member.full_name?.charAt(0) }}
                </span>
              </div>

              <span class="font-black text-[#232A7E] text-2xl">
                {{ member.full_name }}
              </span>
            </div>

            <!-- Role -->
            <span
              class="text-lg font-bold px-5 py-2 rounded-full"
              :class="{
                'bg-[#232A7E]/10 text-[#232A7E]':
                  member.role === 'امين اسرة',

                'bg-[#D0A633]/10 text-[#9a7820]':
                  member.role === 'خادم عادي',
              }"
            >
              {{ member.role }}
            </span>
          </div>
        </div>

        <!-- Empty -->
        <div
          v-else
          class="bg-[#FAF8F3] border border-dashed border-[#D8C9A6] rounded-2xl p-6 text-center text-gray-400 text-lg"
        >
          لا يوجد خدام أو أمناء أسر
        </div>
      </div>

      <!-- Servants Table -->
      <div>
        <h4 class="text-3xl font-black text-[#232A7E] mb-6">
          المخدومين
        </h4>

        <div
          v-if="servants.length"
          class="overflow-hidden rounded-3xl border border-[#ECE7DA]"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between bg-linear-to-r from-[#D0A633] to-[#b88f28] text-white px-8 py-5 font-black text-2xl"
          >
            <div>الاسم</div>
            <div>الدور</div>
          </div>

          <!-- Rows -->
          <div
            v-for="member in servants"
            :key="member.id"
            class="flex items-center justify-between px-8 py-6 bg-[#FAF8F3] border-t border-[#EEE6D5] hover:bg-[#f5f0e7] transition"
          >
            <!-- Name -->
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-full bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="member.image"
                  :src="member.image"
                  class="w-full h-full object-cover"
                />

                <span
                  v-else
                  class="text-white font-bold text-lg"
                >
                  {{ member.full_name?.charAt(0) }}
                </span>
              </div>

              <span class="font-black text-[#232A7E] text-2xl">
                {{ member.full_name }}
              </span>
            </div>

            <!-- Role -->
            <span
              class="text-lg font-bold px-5 py-2 rounded-full bg-gray-100 text-gray-600"
            >
              {{ member.role }}
            </span>
          </div>
        </div>

        <!-- Empty -->
        <div
          v-else
          class="bg-[#FAF8F3] border border-dashed border-[#D8C9A6] rounded-2xl p-6 text-center text-gray-400 text-lg"
        >
          لا يوجد مخدومين
        </div>
      </div>
    </div>
  </div>
</template>