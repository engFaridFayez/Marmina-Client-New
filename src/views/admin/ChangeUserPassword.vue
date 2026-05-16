<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const userStore = useAuthStore();

const userId = route.params.id as string;

const form = ref({
  new_password: "",
  confirm_password: "",
});

const loading = ref(false);

const handleSubmit = async () => {
  // ...
  try {
    loading.value = true;
    await userStore.updateUserPassword(Number(userId), form.value.new_password);
    toast.success("تم تغيير كلمة المرور بنجاح");
    router.push("/admin");
  } catch (error: any) {
    const err = userStore.error;
    // Always ensure toast gets a string
    toast.error(
      Array.isArray(err) ? err.join(", ") : (err || "حدث خطأ أثناء تغيير كلمة المرور")
    );
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4" dir="rtl">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">

      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        تغيير كلمة المرور للمستخدم {{ userStore.selectedUser?.full_name }}
      </h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">

        <!-- New Password -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">
            كلمة المرور الجديدة
          </label>
          <input
            v-model="form.new_password"
            type="password"
            class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="أدخل كلمة المرور الجديدة"
          />
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">
            تأكيد كلمة المرور
          </label>
          <input
            v-model="form.confirm_password"
            type="password"
            class="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="أعد إدخال كلمة المرور"
          />
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition disabled:opacity-50"
        >
          <span v-if="loading">جاري التحديث...</span>
          <span v-else>تغيير كلمة المرور</span>
        </button>

      </form>
    </div>
  </div>
</template>
