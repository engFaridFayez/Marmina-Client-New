<script setup lang="ts">
import { computed, ref } from "vue";
import logo from "@/assets/images/logo.png";
import LoginForm from "@/views/LoginForm.vue";
import { useAuthStore } from "@/stores/auth";
import unknown from "@/assets/images/default.jpg";

const auth = useAuthStore();

if (auth.isAuthenticated) {
  console.log("المستخدم عامل login ✅");
} else {
  console.log("مش عامل login ❌");
}

const imageUrl = computed(() => {
  if (!auth.user?.image) return unknown;
  return auth.user.image.startsWith("http")
    ? auth.user.image
    : `http://127.0.0.1:8000${auth.user.image}`;
});

console.log(auth.fetchUser());

const isOpen = ref(false);

const showLogin = ref(false);
</script>

<template>
  <nav class="bg-[#F1F4F5] text-[#5E616F] sticky py-2 text-xl top-0 z-50 shadow">
    <div class="mx-auto px-5">
      <div class="flex justify-between items-center h-16">
        <!-- Start Logo -->
        <router-link to="/" class="flex justify-center gap-2">
          <img class="w-10 h-10 md:w-15 md:h-15" :src="logo" alt="Marmina Logo" />
          <div class="flex flex-col mt-1">
            <h2 class="text-sm md:text-xl lg:text-xl text-[#1B2947] font-bold">
              مدرسة شمامسة كنيسة الملاك سوريال
            </h2>
            <h5 class="text-[20px] md:text-[12px] text-[#6886a4] font-bold">
              والشهيد العظيم مارمينا - العمرانية
            </h5>
          </div>
        </router-link>

        <!-- Middle Links -->
        <div class="hidden lg:flex gap-6 xl:gap-8">
          <a class="text-[#4a5c6d] font-bold hover:text-gray-900 cursor-pointer">عن الكنيسة</a>
          <a class="text-[#4a5c6d] font-bold hover:text-gray-900 cursor-pointer">الصفوف الكنسية</a>
          <a class="text-[#4a5c6d] font-bold hover:text-gray-900 cursor-pointer">معرض الصور</a>
          <a class="text-[#4a5c6d] font-bold hover:text-gray-900 cursor-pointer">الاعلانات</a>
          <a class="text-[#4a5c6d] font-bold hover:text-gray-900 cursor-pointer">تواصل معنا</a>
        </div>

        <div v-if="auth.isAuthenticated && auth.user" class="hidden lg:flex gap-6 cursor-pointer">
          <router-link to="/profile">
            <div class="flex justify-between bg-[#162A49] py-2 px-7 rounded-2xl">
              <div>
                <img :src="imageUrl" class="w-10 h-10 ml-5 rounded-full" />
              </div>
              <div v-if="auth.user" class="text-xl text-white mt-1">
                {{ auth.user.full_name }}
              </div>
            </div>
          </router-link>
          <div v-if="auth.user.role == 'مخدوم'"></div>
          <div v-else>
            <router-link to="/admin">
              <div class="flex text-white justify-between bg-[#000000] py-2 mt-1 px-7 rounded-2xl">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m9 6h1v5h-8v-5h1v-1a3 3 0 1 1 6 0zm-2 0v-1a1 1 0 1 0-2 0v1z"
                    />
                  </svg>
                </div>
                <div>
                  <h1>Admin</h1>
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <!-- End Links -->
        <div v-else class="hidden lg:flex gap-6 cursor-pointer">
          <a
            @click="showLogin = true"
            class="flex items-center text-white bg-[#D7AB31] py-2 px-3 md:px-5 rounded-2xl text-sm md:text-base hover:text-gray-300"
          >
            <svg
              class="ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="M26 30H14a2 2 0 0 1-2-2v-3h2v3h12V4H14v3h-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2"
              />
              <path
                fill="currentColor"
                d="M14.59 20.59L18.17 17H4v-2h14.17l-3.58-3.59L16 10l6 6l-6 6z"
              />
            </svg>
            تسجيل الدخول
          </a>
        </div>

        <!-- Mobile Button -->
        <button class="lg:hidden text-2xl cursor-pointer" @click="isOpen = !isOpen">☰</button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="isOpen" class="lg:hidden px-4 pb-4 space-y-2">
      <a href="#" class="block py-2 border-b">عن الكنيسة</a>
      <a href="#" class="block py-2 border-b">الصفوف الكنسية</a>
      <a href="#" class="block py-2 border-b">معرض الصور</a>
      <a href="#" class="block py-2 border-b">الاعلانات</a>
      <a href="#" class="block py-2">تواصل معنا</a>
      <div class="flex cursor-pointer">
        <a
          @click="showLogin = true"
          class="flex items-center text-white bg-[#D7AB31] py-2 px-3 md:px-5 rounded-2xl text-sm md:text-base hover:text-gray-300"
        >
          <svg
            class="ml-2"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M26 30H14a2 2 0 0 1-2-2v-3h2v3h12V4H14v3h-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2"
            />
            <path
              fill="currentColor"
              d="M14.59 20.59L18.17 17H4v-2h14.17l-3.58-3.59L16 10l6 6l-6 6z"
            />
          </svg>
          تسجيل الدخول
        </a>
      </div>
    </div>
  </nav>

  <!-- Login Form -->
  <Transition name="fade">
    <LoginForm v-if="showLogin" @close="showLogin = false" />
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
