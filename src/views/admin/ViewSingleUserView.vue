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
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-6" dir="rtl">
    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="text-gray-500 text-lg animate-pulse">جاري تحميل البيانات...</div>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl"
    >
      {{ error }}
    </div>

    <!-- Profile Card -->
    <div v-else-if="user" class="max-w-3xl mx-auto">
      <!-- Header Card -->
      <div class="bg-white rounded-2xl shadow-md p-6 mb-6 text-center">
        <div
          class="w-30 h-30 mx-auto rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold shadow"
        >
          {{ user.full_name?.charAt(0) }}
        </div>

        <h2 class="mt-4 text-4xl font-bold text-gray-800">
          {{ user.full_name }}
        </h2>

        <h2 class="mt-4 text-4xl font-bold text-gray-800">
          {{ user.role }}
        </h2>

        <p class="text-gray-500 text-3xl mt-3">
          {{ user.username }}
        </p>
      </div>

      <!-- Info Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <p class="text-gray-400 text-3xl">📱 رقم الهاتف</p>
          <p class="text-gray-800 font-bold mt-3">{{ user.phone }}</p>
        </div>

        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <p class="text-gray-400 text-3xl">🏠 العنوان</p>
          <p class="text-gray-800 font-bold mt-3">{{ user.address }}</p>
        </div>

        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <p class="text-gray-400 text-3xl">👨 الأب</p>
          <p class="text-gray-800 font-bold mt-3">{{ user.father }}</p>
        </div>

        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <p class="text-gray-400 text-3xl">🎂 تاريخ الميلاد</p>
          <p class="text-gray-800 font-bold mt-3">{{ user.birth_date }}</p>
        </div>

        <div class="bg-white p-4 rounded-xl shadow hover:shadow-md transition">
          <p class="text-gray-400 text-3xl">Slogan</p>
          <p class="text-gray-800 font-bold mt-3">{{ user.slogan }}</p>
        </div>

        <router-link
          v-if="authStore.user?.role !== 'خادم عادي'"
          :to="{ name: 'change-user-password', params: { id: user.id } }"
          class="bg-yellow-400 p-4 rounded-xl shadow hover:shadow-md transition hover:bg-yellow-600 hover:text-white"
        >
          <p class="text-yellow-800 font-bold mt-3 hover:text-white text-3xl">تغيير كلمة المرور</p>
        </router-link>

        <button
          v-if="authStore.user?.role !== 'خادم عادي'"
          @click="askChangeActivity(user.id)"
          :disabled="authStore.loading"
          :class="[
            'p-4 rounded-xl shadow hover:shadow-md transition',
            authStore.selectedUser?.is_active
              ? 'bg-red-400 hover:bg-red-600'
              : 'bg-green-400 hover:bg-green-600',
          ]"
        >
          <p class="text-white font-bold mt-3 pb-3 text-3xl">
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
