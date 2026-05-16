<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await authStore.getFamilyById(Number(route.params.id));
});

const family = computed(() => authStore.selectedFamily);

const leaders = computed(() => {
  if (!family.value?.users) return [];
  return family.value.users.filter(
    (member) => member.role === "امين اسرة" || member.role === "خادم عادي",
  );
});

const servants = computed(() => {
  if (!family.value?.users) return [];
  return family.value.users.filter((member) => member.role === "مخدوم");
});

const goToEdit = (id: number) => router.push(`/users/${id}/edit`);
const goToDetails = (id: number) => router.push(`/users/${id}`);
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
          <h3 class="text-4xl font-black">{{ family.name }}</h3>
          <p class="text-white/70 mt-1 text-2xl">{{ family.year }}</p>
        </div>
        <div
          class="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-center"
        >
          <p class="text-xs text-white/70 mb-0.5">عدد الأعضاء</p>
          <p class="text-3xl font-black">{{ family.users?.length }}</p>
        </div>
      </div>
    </div>

    <!-- Users -->
    <div class="p-6 space-y-10">
      <!-- Leaders Table -->
      <div>
        <h4 class="text-3xl font-black text-[#232A7E] mb-6">الخدام وأمناء الأسر</h4>

        <div v-if="leaders.length" class="overflow-hidden rounded-3xl border border-[#ECE7DA]">
          <!-- Header -->
          <div
            class="grid grid-cols-3 bg-linear-to-r from-[#232A7E] to-[#3a44a8] text-white px-8 py-5 font-black text-2xl"
          >
            <div>الاسم</div>
            <div class="text-center">الدور</div>
            <div class="text-left">الإجراءات</div>
          </div>

          <!-- Rows -->
          <div
            v-for="member in leaders"
            :key="member.id"
            class="grid grid-cols-3 items-center px-8 py-5 bg-[#FAF8F3] border-t border-[#EEE6D5] hover:bg-[#f5f0e7] transition"
          >
            <!-- Name -->
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-full bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center overflow-hidden shrink-0"
              >
                <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />
                <span v-else class="text-white font-bold text-lg">
                  {{ member.full_name?.charAt(0) }}
                </span>
              </div>
              <span class="font-black text-[#232A7E] text-xl">{{ member.full_name }}</span>
            </div>

            <!-- Role -->
            <div class="flex justify-center">
              <span
                class="text-lg font-bold px-5 py-2 rounded-full"
                :class="{
                  'bg-[#232A7E]/10 text-[#232A7E]': member.role === 'امين اسرة',
                  'bg-[#D0A633]/10 text-[#9a7820]': member.role === 'خادم عادي',
                }"
              >
                {{ member.role }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 justify-end">
              <button
                @click="goToDetails(member.id)"
                class="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#232A7E]/10 text-[#232A7E] hover:bg-[#232A7E] hover:text-white font-bold text-lg transition "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                تفاصيل
              </button>
              <button
                @click="goToEdit(member.id)"
                class="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D0A633]/10 text-[#9a7820] hover:bg-[#D0A633] hover:text-white font-bold text-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                تعديل
              </button>
            </div>
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
        <h4 class="text-3xl font-black text-[#232A7E] mb-6">المخدومين</h4>

        <div v-if="servants.length" class="overflow-hidden rounded-3xl border border-[#ECE7DA]">
          <!-- Header -->
          <div
            class="grid grid-cols-3 bg-linear-to-r from-[#D0A633] to-[#b88f28] text-white px-8 py-5 font-black text-2xl"
          >
            <div>الاسم</div>
            <div class="text-center">الدور</div>
            <div class="text-left">الإجراءات</div>
          </div>

          <!-- Rows -->
          <div
            v-for="member in servants"
            :key="member.id"
            class="grid grid-cols-3 items-center px-8 py-5 bg-[#FAF8F3] border-t border-[#EEE6D5] hover:bg-[#f5f0e7] transition"
          >
            <!-- Name -->
            <div class="flex items-center gap-4">
              <div
                class="w-14 h-14 rounded-full bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center overflow-hidden shrink-0"
              >
                <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />
                <span v-else class="text-white font-bold text-lg">
                  {{ member.full_name?.charAt(0) }}
                </span>
              </div>
              <span class="font-black text-[#232A7E] text-xl">{{ member.full_name }}</span>
            </div>

            <!-- Role -->
            <div class="flex justify-center">
              <span class="text-lg font-bold px-5 py-2 rounded-full bg-gray-100 text-gray-600">
                {{ member.role }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 justify-end">
              <button
                @click="goToDetails(member.id)"
                class="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#232A7E]/10 text-[#232A7E] hover:bg-[#232A7E] hover:text-white font-bold text-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                تفاصيل
              </button>
              <button
                @click="goToEdit(member.id)"
                class="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D0A633]/10 text-[#9a7820] hover:bg-[#D0A633] hover:text-white font-bold text-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                تعديل
              </button>
            </div>
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
