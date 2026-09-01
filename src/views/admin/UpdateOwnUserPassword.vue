```vue
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const newPassword = ref("");
const confirmPassword = ref("");

const handleUpdatePassword = async () => {
  try {
    await authStore.updateOwnUserPassword(newPassword.value, confirmPassword.value);

    // Success Toast
    toast.success("تم تغيير كلمة المرور بنجاح");

    // Redirect بعد ثانية
    setTimeout(() => {
      router.push("/admin");
    }, 1000);
  } catch (error) {
    // Error Toast
    toast.error(authStore.error || "حدث خطأ أثناء تغيير كلمة المرور");
  }
};
</script>

<template>
  <div class="max-w-xl mx-auto p-6">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <!-- Title -->
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-800">تغيير كلمة المرور</h2>

        <p class="text-sm text-gray-500 mt-1">قم بإدخال كلمة المرور الجديدة وتأكيدها.</p>
      </div>

      <form @submit.prevent="handleUpdatePassword">
        <!-- New Password -->
        <div class="mb-5">
          <label for="new_password" class="block mb-2 text-sm font-medium text-gray-700">
            كلمة المرور الجديدة
          </label>

          <input
            id="new_password"
            v-model="newPassword"
            type="password"
            autocomplete="new-password"
            placeholder="أدخل كلمة المرور الجديدة"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <!-- Confirm Password -->
        <div class="mb-5">
          <label for="confirm_password" class="block mb-2 text-sm font-medium text-gray-700">
            تأكيد كلمة المرور
          </label>

          <input
            id="confirm_password"
            v-model="confirmPassword"
            type="password"
            autocomplete="new-password"
            placeholder="أعد إدخال كلمة المرور"
            class="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full rounded-lg bg-primary text-white bg-[#301214] py-3 font-medium transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="authStore.loading"> جاري تغيير كلمة المرور... </span>

          <span v-else> تغيير كلمة المرور </span>
        </button>
      </form>
    </div>
  </div>
</template>
```
