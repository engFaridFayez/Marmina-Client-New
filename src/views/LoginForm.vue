<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const auth = useAuthStore();

const username = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    await auth.login(username.value, password.value);
    alert("Login Success ✅");
  } catch (error) {
    alert("Login Failed ❌");
  }
};
</script>

<template>
  <div
    class="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    @click.self="emit('close')"
  >
    <div class="bg-white w-[90%] md:w-100 rounded-4xl p-6 relative">
      <!-- Close -->
      <button @click="emit('close')" class="absolute top-4 right-5 text-gray-500 hover:text-black">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-dasharray="12"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 12l7 7M12 12l-7 -7M12 12l-7 7M12 12l7 -7"
          >
            <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="12;0" />
          </path>
        </svg>
      </button>

      <div class="flex justify-center p-8 mx-28 mb-5 bg-amber-400 rounded-full text-center">
        <svg
          class="text-[#182843]"
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m10 2l-.117.007A1 1 0 0 0 9 3v4H5a1 1 0 0 0-1 1v4l.007.117A1 1 0 0 0 5 13h4v8a1 1 0 0 0 1 1h4l.117-.007A1 1 0 0 0 15 21v-8h4a1 1 0 0 0 1-1V8l-.007-.117A1 1 0 0 0 19 7h-4V3a1 1 0 0 0-1-1z"
          />
        </svg>
      </div>

      <h2 class="text-4xl font-bold mb-4 text-center">تسجيل الدخول</h2>
      <h5 class="text-xl mb-15 text-center">اهلاً بك في مدرسة الشمامسة</h5>

      <div class="flex flex-col gap-4">
        <!-- الرقم القومي -->
        <div class="flex flex-col gap-1">
          <label for="nationalId">الرقم القومي</label>

          <div class="relative">
            <input
              id="nationalId"
              type="text"
              placeholder="#12345678901234"
              v-model="username"
              class="border p-2 pl-10 rounded-4xl w-full"
            />

            <!-- Icon -->
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5S7 4.3 7 7s2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- كلمة المرور -->
        <div class="flex flex-col gap-1">
          <label for="password">كلمة المرور</label>

          <div class="relative">
            <input
              id="password"
              type="password"
              placeholder="*********"
              v-model="password"
              class="border p-2 pl-10 rounded-4xl w-full"
            />

            <!-- Icon -->
            <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 17a2 2 0 1 0 0-4a2 2 0 0 0 0 4zm6-7h-1V8a5 5 0 0 0-10 0v2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2zm-6-5a3 3 0 0 1 3 3v2H9V8a3 3 0 0 1 3-3z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="flex justify-end text-amber-500">
          <a> هل نسيت كلمة السر؟ </a>
        </div>

        <!-- Button -->
        <button
          @click="handleLogin"
          class="bg-[#D7AB31] text-white py-2 rounded-4xl hover:bg-yellow-500 transition"
        >
          دخول
        </button>
      </div>
    </div>
  </div>
</template>
