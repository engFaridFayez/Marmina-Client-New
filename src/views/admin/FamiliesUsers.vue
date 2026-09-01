<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRoute, useRouter } from "vue-router";

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onMounted(async () => {
  await authStore.getFamilyById(Number(route.params.id));

  console.log("SELECTED FAMILY:", authStore.selectedFamily);
  console.log("STAGE:", authStore.selectedFamily?.stage);
  console.log("STAGE LEADERS:", authStore.selectedFamily?.stage?.leaders);
});

const family = computed(() => authStore.selectedFamily);
const leaders = computed(() => {
  if (!family.value?.users) return [];

  // prettier-ignore
  const roleOrder: Record<string, number> = {
    "امين اسرة": 1,
    "امين مساعد اسرة": 2,
    "خادم": 3,
    "سكرتاريه": 4,
  };

  return family.value.users
    .filter(
      (member) =>
        member.role === "امين اسرة" || member.role === "خادم" || member.role === "امين مساعد اسرة",
    )
    .sort((a, b) => {
      return (roleOrder[a.role] ?? 99) - (roleOrder[b.role] ?? 99);
    });
});

const stageLeaders = computed(() => {
  return family.value?.stage?.leaders ?? [];
});

const servants = computed(() => {
  if (!family.value?.users) return [];
  return family.value.users.filter((member) => member.role === "مخدوم");
});

const goToEdit = (id: number) => router.push(`/users/${id}/edit`);
const goToDetails = (id: number) => router.push(`/users/${id}`);

// prettier-ignore
const roleLevel: Record<string, number> = {
  "مخدوم" : 1,
  "خادم": 2,
  "امين مساعد اسرة": 3,
  "امين اسرة": 4,
  "امين مرحلة": 5,
  "امين الشمامسة": 6,
  "admin":7,
};

const canManageUser = (memberRole: string) => {
  const currentRole = authStore.user?.role;

  if (!currentRole || !memberRole) {
    return false;
  }

  // أمين الشمامسة يقدر يعدل أي حد أقل منه
  if (currentRole === "امين الشمامسة") {
    return memberRole !== "امين الشمامسة";
  }

  const currentLevel = roleLevel[currentRole] ?? 0;
  const selectedLevel = roleLevel[memberRole] ?? 0;

  return currentLevel > selectedLevel;
};
</script>

<template>
  <div
    v-if="family"
    class="bg-white rounded-2xl sm:rounded-4xl shadow-lg border border-[#ECE7DA] overflow-hidden"
    dir="rtl"
  >
    <!-- Header -->
    <div class="bg-linear-to-r from-[#232A7E] to-[#3a44a8] p-4 sm:p-6 text-white">
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4"
      >
        <div class="min-w-0">
          <h3 class="text-xl sm:text-3xl md:text-4xl font-black wrap-break-word">{{ family.name }}</h3>
          <p class="text-white/70 mt-1 text-sm sm:text-lg md:text-2xl">{{ family.year }}</p>
        </div>
        <div
          class="bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2 sm:px-5 sm:py-3 rounded-2xl text-center shrink-0 self-start sm:self-auto"
        >
          <p class="text-xs text-white/70 mb-0.5">عدد الأعضاء</p>
          <p class="text-xl sm:text-2xl md:text-3xl font-black">{{ family.users?.length }}</p>
        </div>
      </div>
    </div>

    <!-- Users -->
    <div class="p-3 sm:p-6 space-y-6 sm:space-y-10">
      <!-- Stage leaders -->
      <div>
        <h4 class="text-xl sm:text-2xl md:text-3xl font-black text-[#232A7E] mb-3 sm:mb-6">
          امين المرحلة
        </h4>

        <div
          v-if="stageLeaders.length"
          class="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE7DA]"
        >
          <!-- Column header: table view only, from sm up -->
          <div
            class="hidden sm:grid sm:grid-cols-3 bg-linear-to-r from-[#232A7E] to-[#3a44a8] text-white px-8 py-5 font-black text-xl md:text-2xl"
          >
            <div>الاسم</div>
            <div class="text-center">الدور</div>
            <div class="text-left">الإجراءات</div>
          </div>

          <!-- Rows: stacked card on mobile, table row from sm up -->
          <div
            v-for="member in stageLeaders"
            :key="member.id"
            class="flex flex-col gap-3 p-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-0 sm:px-8 sm:py-5 bg-[#FAF8F3] border-t border-[#EEE6D5] hover:bg-[#f5f0e7] transition"
          >
            <!-- Name -->
            <div class="flex items-center gap-3 sm:gap-4 min-w-0">
              <div
                class="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center overflow-hidden shrink-0"
              >
                <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />
                <span v-else class="text-white font-bold text-sm sm:text-lg">
                  {{ member.full_name?.charAt(0) }}
                </span>
              </div>
              <span class="font-black text-[#232A7E] text-base sm:text-xl wrap-break-word">{{
                member.full_name
              }}</span>
            </div>

            <!-- Role -->
            <div class="flex justify-start sm:justify-center">
              <span
                class="text-xs sm:text-lg font-bold px-3 py-1.5 sm:px-5 sm:py-2 rounded-full whitespace-nowrap"
                :class="{
                  'bg-[#232A7E]/10 text-[#232A7E]': member.role === 'امين اسرة',
                  'bg-[#D0A633]/10 text-[#9a7820]': member.role === 'خادم',
                }"
              >
                {{ member.role }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 sm:justify-end">
              <button
                @click="goToDetails(member.id)"
                class="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 rounded-xl bg-[#232A7E]/10 text-[#232A7E] hover:bg-[#232A7E] hover:text-white font-bold text-sm sm:text-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
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
                v-if="canManageUser(member.role)"
                class="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 rounded-xl bg-[#D0A633]/10 text-[#9a7820] hover:bg-[#D0A633] hover:text-white font-bold text-sm sm:text-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
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
          class="bg-[#FAF8F3] border border-dashed border-[#D8C9A6] rounded-2xl p-4 sm:p-6 text-center text-gray-400 text-sm sm:text-lg"
        >
          لا يوجد خدام أو أمناء أسر
        </div>
      </div>

      <!-- Leaders -->
      <div>
        <h4 class="text-xl sm:text-2xl md:text-3xl font-black text-[#232A7E] mb-3 sm:mb-6">
          الخدام وأمناء الأسر
        </h4>

        <div
          v-if="leaders.length"
          class="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE7DA]"
        >
          <div
            class="hidden sm:grid sm:grid-cols-3 bg-linear-to-r from-[#232A7E] to-[#3a44a8] text-white px-8 py-5 font-black text-xl md:text-2xl"
          >
            <div>الاسم</div>
            <div class="text-center">الدور</div>
            <div class="text-left">الإجراءات</div>
          </div>

          <div
            v-for="member in leaders"
            :key="member.id"
            class="flex flex-col gap-3 p-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-0 sm:px-8 sm:py-5 bg-[#FAF8F3] border-t border-[#EEE6D5] hover:bg-[#f5f0e7] transition"
          >
            <!-- Name -->
            <div class="flex items-center gap-3 sm:gap-4 min-w-0">
              <div
                class="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center overflow-hidden shrink-0"
              >
                <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />
                <span v-else class="text-white font-bold text-sm sm:text-lg">
                  {{ member.full_name?.charAt(0) }}
                </span>
              </div>
              <span class="font-black text-[#232A7E] text-base sm:text-xl wrap-break-word">{{
                member.full_name
              }}</span>
            </div>

            <!-- Role -->
            <div class="flex justify-start sm:justify-center">
              <span
                class="text-xs sm:text-lg font-bold px-3 py-1.5 sm:px-5 sm:py-2 rounded-full whitespace-nowrap"
                :class="{
                  'bg-[#232A7E]/10 text-[#232A7E]': member.role === 'امين اسرة',
                  'bg-[#e77920]/10 text-[#e77920]': member.role === 'امين مساعد اسرة',
                  'bg-[#D0A633]/10 text-[#9a7820]': member.role === 'خادم',
                }"
              >
                {{ member.role }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 sm:justify-end">
              <button
                @click="goToDetails(member.id)"
                class="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 rounded-xl bg-[#232A7E]/10 text-[#232A7E] hover:bg-[#232A7E] hover:text-white font-bold text-sm sm:text-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
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
                v-if="canManageUser(member.role)"
                @click="goToEdit(member.id)"
                class="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 rounded-xl bg-[#D0A633]/10 text-[#9a7820] hover:bg-[#D0A633] hover:text-white font-bold text-sm sm:text-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
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
          class="bg-[#FAF8F3] border border-dashed border-[#D8C9A6] rounded-2xl p-4 sm:p-6 text-center text-gray-400 text-sm sm:text-lg"
        >
          لا يوجد خدام أو أمناء أسر
        </div>
      </div>

      <!-- Servants -->
      <div>
        <h4 class="text-xl sm:text-2xl md:text-3xl font-black text-[#232A7E] mb-3 sm:mb-6">
          المخدومين
        </h4>

        <div
          v-if="servants.length"
          class="overflow-hidden rounded-2xl sm:rounded-3xl border border-[#ECE7DA]"
        >
          <div
            class="hidden sm:grid sm:grid-cols-3 bg-linear-to-r from-[#D0A633] to-[#b88f28] text-white px-8 py-5 font-black text-xl md:text-2xl"
          >
            <div>الاسم</div>
            <div class="text-center">الدور</div>
            <div class="text-left">الإجراءات</div>
          </div>

          <div
            v-for="member in servants"
            :key="member.id"
            class="flex flex-col gap-3 p-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-0 sm:px-8 sm:py-5 bg-[#FAF8F3] border-t border-[#EEE6D5] hover:bg-[#f5f0e7] transition"
          >
            <!-- Name -->
            <div class="flex items-center gap-3 sm:gap-4 min-w-0">
              <div
                class="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center overflow-hidden shrink-0"
              >
                <img v-if="member.image" :src="member.image" class="w-full h-full object-cover" />
                <span v-else class="text-white font-bold text-sm sm:text-lg">
                  {{ member.full_name?.charAt(0) }}
                </span>
              </div>
              <span class="font-black text-[#232A7E] text-base sm:text-xl wrap-break-word">{{
                member.full_name
              }}</span>
            </div>

            <!-- Role -->
            <div class="flex justify-start sm:justify-center">
              <span
                class="text-xs sm:text-lg font-bold px-3 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gray-100 text-gray-600 whitespace-nowrap"
              >
                {{ member.role }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 sm:justify-end">
              <button
                @click="goToDetails(member.id)"
                class="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 rounded-xl bg-[#232A7E]/10 text-[#232A7E] hover:bg-[#232A7E] hover:text-white font-bold text-sm sm:text-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
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
                v-if="canManageUser(member.role)"
                @click="goToEdit(member.id)"
                class="cursor-pointer flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 rounded-xl bg-[#D0A633]/10 text-[#9a7820] hover:bg-[#D0A633] hover:text-white font-bold text-sm sm:text-lg transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 sm:w-6 sm:h-6 shrink-0"
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
          class="bg-[#FAF8F3] border border-dashed border-[#D8C9A6] rounded-2xl p-4 sm:p-6 text-center text-gray-400 text-sm sm:text-lg"
        >
          لا يوجد مخدومين
        </div>
      </div>
    </div>
  </div>
</template>
