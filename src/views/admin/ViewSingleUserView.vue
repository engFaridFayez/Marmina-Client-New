<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import Popup from "@/components/HomeComponents/Popup.vue";

const route = useRoute();
const authStore = useAuthStore();

const showPopup = ref(false);
const selectedUserId = ref<number | null>(null);

const userId = Number(route.params.id);

onMounted(async () => {
  await authStore.getSignleUser(userId);
});

const user = computed(() => authStore.selectedUser);
const loading = computed(() => authStore.loading);
const error = computed(() => authStore.error);

/* فتح popup */
const askChangeActivity = (id: number) => {
  selectedUserId.value = id;
  showPopup.value = true;
};

/* تأكيد العملية */
const confirmChangeActivity = async () => {
  if (!selectedUserId.value) return;

  try {
    await authStore.changeUserActivity(selectedUserId.value);

    showPopup.value = false;
    selectedUserId.value = null;

    // اختياري: إعادة تحميل بيانات المستخدم
    await authStore.getSignleUser(userId);
  } catch (error) {
    console.error(error);
  }
};

/* إغلاق popup */
const closePopup = () => {
  showPopup.value = false;
  selectedUserId.value = null;
};

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

const canManageSelectedUser = computed(() => {
  const currentRole = authStore.user?.role;
  const selectedRole = authStore.selectedUser?.role;

  if (!currentRole || !selectedRole) {
    return false;
  }

  if (currentRole === "امين الشمامسة") {
    return selectedRole !== "امين الشمامسة";
  }

  const currentLevel = roleLevel[currentRole] ?? 0;
  const selectedLevel = roleLevel[selectedRole] ?? 0;

  return currentLevel > selectedLevel;
});
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-3 sm:p-6" dir="rtl">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="text-gray-500 text-base sm:text-lg animate-pulse">
        جاري تحميل البيانات...
      </div>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm sm:text-base"
    >
      {{ error }}
    </div>

    <!-- Profile Card -->
    <div v-else-if="user" class="max-w-3xl mx-auto">
      <!-- Header Card -->
      <div class="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6 text-center">
        <div
          class="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full bg-blue-500 text-white flex items-center justify-center text-xl sm:text-2xl md:text-3xl font-bold shadow shrink-0"
        >
          {{ user.full_name?.charAt(0) }}
        </div>

        <h2 class="mt-3 sm:mt-4 text-lg sm:text-2xl md:text-3xl font-bold text-gray-800 wrap-break-word px-2">
          {{ user.full_name }}
        </h2>

        <h2 class="mt-1 sm:mt-2 text-base sm:text-xl md:text-2xl font-semibold text-gray-600 wrap-break-word px-2">
          {{ user.role }}
        </h2>

        <p class="text-gray-500 text-sm sm:text-lg mt-2 sm:mt-3 wrap-break-word px-2">
          {{ user.username }}
        </p>
      </div>

      <!-- Info Cards: stacked full-width on mobile, 2-column grid from sm up -->
      <div class="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition w-full min-w-0">
          <p class="text-gray-400 text-xs sm:text-sm md:text-base">📱 رقم الهاتف</p>
          <p class="text-gray-800 font-bold mt-2 text-sm sm:text-base wrap-break-word">{{ user.phone }}</p>
        </div>

        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition w-full min-w-0">
          <p class="text-gray-400 text-xs sm:text-sm md:text-base">🏠 العنوان</p>
          <p class="text-gray-800 font-bold mt-2 text-sm sm:text-base wrap-break-word">{{ user.address }}</p>
        </div>

        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition w-full min-w-0">
          <p class="text-gray-400 text-xs sm:text-sm md:text-base">👨 الأب</p>
          <p class="text-gray-800 font-bold mt-2 text-sm sm:text-base wrap-break-word">{{ user.father }}</p>
        </div>

        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition w-full min-w-0">
          <p class="text-gray-400 text-xs sm:text-sm md:text-base">🎂 تاريخ الميلاد</p>
          <p class="text-gray-800 font-bold mt-2 text-sm sm:text-base wrap-break-word">{{ user.birth_date }}</p>
        </div>

        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition w-full min-w-0 sm:col-span-2">
          <p class="text-gray-400 text-xs sm:text-sm md:text-base">Slogan</p>
          <p class="text-gray-800 font-bold mt-2 text-sm sm:text-base wrap-break-word">{{ user.slogan }}</p>
        </div>
      </div>

      <!-- Action Cards: always their own stacked row, never squeezed beside the info above -->
      <div
        v-if="authStore.user?.role !== 'خادم' && canManageSelectedUser"
        class="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-4"
      >
        <router-link
          :to="{ name: 'change-user-password', params: { id: user.id } }"
          class="bg-yellow-400 p-4 rounded-xl shadow hover:shadow-md transition hover:bg-yellow-600 hover:text-white flex items-center justify-center text-center w-full sm:flex-1"
        >
          <p class="text-yellow-800 font-bold hover:text-white text-sm sm:text-base md:text-lg">
            تغيير كلمة المرور
          </p>
        </router-link>

        <button
          @click="askChangeActivity(user.id)"
          :disabled="authStore.loading"
          :class="[
            'p-4 rounded-xl shadow hover:shadow-md transition flex items-center justify-center text-center w-full sm:flex-1',
            authStore.selectedUser?.is_active
              ? 'bg-red-400 hover:bg-red-600'
              : 'bg-green-400 hover:bg-green-600',
          ]"
        >
          <p class="text-white font-bold text-sm sm:text-base md:text-lg">
            {{ authStore.selectedUser?.is_active ? "غلق الحساب" : "فتح الحساب" }}
          </p>
        </button>
      </div>
      <Popup
        v-if="showPopup"
        class="fixed inset-0 z-50"
        title="تأكيد العملية"
        :content="user?.is_active ? 'هل أنت متأكد من غلق الحساب؟' : 'هل تريد إعادة تفعيل الحساب؟'"
        button="نعم"
        type="error"
        @close="closePopup"
        @action="confirmChangeActivity"
      />
    </div>
  </div>
</template>
