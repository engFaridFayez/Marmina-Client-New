<script setup lang="ts">
import { onMounted, computed, watch } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const user = computed(() => authStore.user);

const isStageLeader = computed(() =>
  user.value?.role === "امين مرحلة"
);

const isAdmin = computed(() =>
  user.value?.is_staff || user.value?.is_superuser
);

const isFamilyUser = computed(() =>
  user.value?.role === "امين اسرة" ||
  user.value?.role === "خادم عادي" ||
  user.value?.role === "مخدوم"
);

watch(
  () => authStore.user,
  (newVal) => {
    console.log("🔥 USER UPDATED:", newVal);
    console.log("ROLE:", newVal?.role);
    console.log("IS STAFF:", newVal?.is_staff);
    console.log("IS SUPER:", newVal?.is_superuser);
  },
  { immediate: true }
);

onMounted(async () => {
  authStore.loading = true;
  await authStore.fetchUser();

  const currentUser = authStore.user;

  console.log("🚀 AFTER FETCH USER:", currentUser);

  if (currentUser?.is_staff || currentUser?.is_superuser) {
    console.log("ADMIN DETECTED");
    await authStore.getStages();
  } else if (currentUser?.role === "امين مرحلة") {
    console.log("STAGE LEADER DETECTED");
    await authStore.getStages();
  } else if (
    currentUser?.role === "امين اسرة" ||
    currentUser?.role === "خادم عادي" ||
    currentUser?.role === "مخدوم"
  ) {
    console.log("FAMILY USER DETECTED");
    await authStore.getFamilies();
  } else {
    authStore.loading = false;
  }
});


</script>

<template>
  <div class="min-h-screen bg-[#F8F5EE] p-4 md:p-8" dir="rtl">

    <!-- HEADER -->
    <div>
      <div v-if="authStore.user?.role === 'امين اسرة' || authStore.user?.role === 'امين الشمامسة' || authStore.user?.is_staff" class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

        <div>
          <h1 class="text-3xl md:text-5xl font-black mb-3">الأسر</h1>
          <p class="text-white/80 text-lg">
            {{ isFamilyUser ? "أسرتي" : "جميع الأسر داخل المراحل" }}
          </p>
        </div>

        <!-- Admin + Stage Leader -->
        <div v-if="isAdmin || isStageLeader"
          class="bg-white/15 backdrop-blur-md border border-white/20 px-6 py-4 rounded-3xl"
        >
          <p class="text-sm text-white/70 mb-1">عدد المراحل</p>
          <h2 class="text-4xl font-black">{{ authStore.stages.length }}</h2>
        </div>

        <!-- Family Users -->
        <div v-else-if="isFamilyUser"
          class="bg-white/15 backdrop-blur-md border border-white/20 px-6 py-4 rounded-3xl"
        >
          <p class="text-sm text-white/70 mb-1">عدد الأسر</p>
          <h2 class="text-4xl font-black">{{ authStore.families.length }}</h2>
        </div>

      </div>
    </div>

    <!-- LOADING -->
    <div v-if="authStore.loading" class="flex justify-center items-center h-60">
      <div class="w-14 h-14 border-4 border-[#D0A633] border-t-transparent rounded-full animate-spin"></div>
    </div>

    <!-- STAGES VIEW (ADMIN / STAGE LEADER) -->
    <div v-else-if="isAdmin || isStageLeader" class="space-y-10">
      <div
        v-for="stage in authStore.stages"
        :key="stage.id"
        class="bg-white rounded-4xl p-6 md:p-8 shadow-lg border border-[#ECE7DA]"
      >
        <div class="flex items-center gap-4 mb-8">
          <div class="w-16 h-16 rounded-2xl bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 100-4H5a2 2 0 000 4m14 0v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6"/>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-black text-[#232A7E]">{{ stage.name }}</h2>
            <p class="text-gray-500 mt-1">{{ stage.families?.length || 0 }} أسرة</p>
          </div>
        </div>

        <div v-if="stage.families?.length" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="family in stage.families"
            :key="family.id"
            class="bg-[#FAF8F3] border border-[#EEE6D5] rounded-[28px] p-6 hover:border-[#D0A633] transition"
          >
            <h3 class="text-xl font-extrabold text-[#232A7E]">{{ family.name }}</h3>
            <p class="text-gray-500 mt-2">{{ family.year }}</p>
          </div>
        </div>

        <div v-else class="bg-[#FAF8F3] border border-dashed border-[#D8C9A6] rounded-3xl p-10 flex flex-col items-center justify-center">
          <h3 class="text-xl font-bold text-[#232A7E] mb-2">لا توجد أسر</h3>
          <p class="text-gray-500">لم يتم إضافة أسر لهذه المرحلة بعد</p>
        </div>
      </div>
    </div>

    <!-- =============================================
         FAMILY VIEW (NORMAL USERS) — WITH MEMBERS
    ============================================== -->
    <div v-else-if="isFamilyUser" class="space-y-8">

      <div
        v-for="family in authStore.families"
        :key="family.id"
        class="bg-white rounded-4xl shadow-lg border border-[#ECE7DA] overflow-hidden"
      >

        <!-- Family Header -->
        <div class="bg-linear-to-r from-[#232A7E] to-[#3a44a8] p-6 text-white">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-4xl font-black">{{ family.name }}</h3>
              <p class="text-white/70 mt-1 text-2xl">{{ family.year }}</p>
            </div>
            <div class="bg-white/15 backdrop-blur-md border border-white/20 px-5 py-3 rounded-2xl text-center">
              <p class="text-xs text-white/70 mb-0.5">عدد الأعضاء</p>
              <p class="text-3xl font-black">{{ family.user_count ?? family.users?.length ?? 0 }}</p>
            </div>
          </div>
        </div>

        <!-- Members List -->
        <div class="p-6">

          <h4 class="text-xl font-bold text-[#232A7E] mb-4">أعضاء الأسرة</h4>

          <div v-if="family.users?.length" class="space-y-3">
            <div
              v-for="member in family.users"
              :key="member.id"
              class="flex items-center gap-4 bg-[#FAF8F3] border border-[#EEE6D5] rounded-2xl px-5 py-4 hover:border-[#D0A633] transition"
            >

              <!-- Avatar -->
              <div class="w-11 h-11 rounded-full bg-linear-to-br from-[#232A7E] to-[#D0A633] flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  v-if="member.image"
                  :src="member.image"
                  :alt="member.full_name"
                  class="w-full h-full object-cover"
                />
                <span v-else class="text-white font-bold text-sm">
                  {{ member.full_name?.trim()?.charAt(0) ?? '?' }}
                </span>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <p class="font-bold text-[#232A7E] truncate text-xl">{{ member.full_name?.trim() }}</p>
                <p class="text-lg text-gray-400 mt-0.5">{{ member.username }}</p>
              </div>

              <!-- Role Badge -->
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

          <!-- Empty members -->
          <div v-else class="bg-[#FAF8F3] border border-dashed border-[#D8C9A6] rounded-2xl p-8 text-center">
            <p class="text-gray-400">لا يوجد أعضاء في هذه الأسرة</p>
          </div>

        </div>
      </div>

    </div>

    <!-- FALLBACK -->
    <div v-else class="text-center text-gray-500 mt-10">
      لا توجد بيانات لعرضها
    </div>

  </div>
</template>