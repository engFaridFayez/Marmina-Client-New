<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import logo from "@/assets/images/logo.png";
import LoginForm from "@/views/LoginForm.vue";
import { useAuthStore } from "@/stores/auth";
import unknown from "@/assets/images/default.jpg";
const auth = useAuthStore();
// Single source of truth for the section links, used by BOTH the desktop
// bar and the mobile menu so they never fall out of sync again.
const navLinks = [
  { name: "الرئيسية", href: "/#home" },
  { name: "عن الكنيسة", href: "/#about" },
  { name: "ألاباء", href: "/#fathers" },
  { name: "أُسر الشمامسة", href: "/#families" },
  { name: "الجدول", href: "/#table" },
  { name: "معرض الصور", href: "/#gallery" },
  { name: "الاعلانات", href: "/#ads" },
  { name: "تواصل معنا", href: "/#contact" },
];

const imageUrl = computed(() => {
  if (!auth.user?.image) return unknown;

  return auth.user.image.startsWith("http")
    ? auth.user.image
    : `https://api.sourialdeacons.com${auth.user.image}`;
});

const isOpen = ref(false);

const showLogin = ref(false);
onMounted(() => {
  if (auth.isAuthenticated && auth.user) {
    console.log(auth.user);
    console.log("USER:", auth.user);
    console.log("ROLE:", auth.user?.role);
    console.log("IS STAFF:", auth.user?.is_staff);
  }
});
</script>

<template>
  <nav class="bg-[#F1F4F5] text-[#5E616F] sticky py-2 text-xl top-0 z-50 shadow">
    <div class="max-w-screen-2xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 gap-2">
        <!-- Start Logo -->
        <router-link to="/" class="flex items-center gap-2 shrink-0 min-w-0">
          <img
            class="w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-15 lg:h-15 shrink-0"
            :src="logo"
            alt="Marmina Logo"
          />
          <div class="flex flex-col mt-1 min-w-0">
            <h2
              class="text-[11px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[#1B2947] font-bold truncate"
            >
              مدرسة شمامسة كنيسة الملاك سوريال
            </h2>
            <h5
              class="text-[10px] xs:text-[11px] sm:text-xs md:text-[11px] lg:text-[12px] text-[#6886a4] font-bold truncate"
            >
              والشهيد العظيم مارمينا - العمرانية
            </h5>
          </div>
        </router-link>

        <!--
          Desktop nav (links + auth) now switches on at `xl` instead of `lg`.
          Between 1024px–1280px there just isn't room for links + a 4-word
          name pill + admin button, so that range now uses the mobile menu,
          which already has plenty of space and works correctly.
        -->

        <!-- Middle Links -->
        <div class="hidden xl:flex flex-wrap justify-center gap-3 2xl:gap-3">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-[#4a5c6d] font-bold hover:text-gray-900 cursor-pointer scroll-smooth whitespace-nowrap text-sm 2xl:text-base"
          >
            {{ link.name }}
          </a>
        </div>

        <!-- Auth Links -->
        <div
          v-if="auth.isAuthenticated && auth.user"
          class="hidden xl:flex items-center gap-3 2xl:gap-6 cursor-pointer shrink-0"
        >
          <!-- Full name -->
          <router-link to="/profile" class="min-w-0">
            <div
              class="flex items-center gap-3 2xl:gap-4 bg-[#162A49] py-2 px-3 2xl:px-5 rounded-2xl"
            >
              <img
                :src="imageUrl"
                class="w-9 h-9 2xl:w-10 2xl:h-10 rounded-full object-cover shrink-0"
              />
              <div
                v-if="auth.user"
                class="text-white text-sm 2xl:text-base leading-tight line-clamp-2 wrap-break-word max-w-28 2xl:max-w-28"
                :title="auth.user.full_name"
              >
                {{ auth.user.full_name }}
              </div>
            </div>
          </router-link>

          <div v-if="auth.user.role == 'مخدوم'"></div>

          <div v-else-if="auth.user.is_staff || auth.user.role !== 'مخدوم'" class="shrink-0">
            <router-link to="/admin">
              <div
                class="flex items-center text-white justify-between bg-[#000000] py-2 px-3 2xl:px-7 rounded-2xl"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  class="shrink-0"
                >
                  <path
                    fill="currentColor"
                    d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m9 6h1v5h-8v-5h1v-1a3 3 0 1 1 6 0zm-2 0v-1a1 1 0 1 0-2 0v1z"
                  />
                </svg>
                <h1 class="text-sm 2xl:text-base mr-2">Admin</h1>
              </div>
            </router-link>
          </div>
        </div>

        <!-- End Links -->
        <div v-else class="hidden xl:flex gap-6 cursor-pointer shrink-0">
          <a
            @click="showLogin = true"
            class="flex items-center text-white bg-[#D7AB31] py-2 px-3 2xl:px-5 rounded-2xl text-sm 2xl:text-base hover:text-gray-300"
          >
            <svg
              class="ml-2 shrink-0"
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
        <button
          class="xl:hidden text-2xl cursor-pointer shrink-0 leading-none"
          @click="isOpen = !isOpen"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isOpen"
      class="xl:hidden px-4 pb-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto"
    >
      <!-- Links (now the SAME links shown on desktop) -->
      <a
        v-for="link in navLinks"
        :key="link.href"
        :href="link.href"
        class="block py-2 border-b text-[#4a5c6d] font-bold text-base sm:text-lg"
        @click="isOpen = false"
      >
        {{ link.name }}
      </a>

      <!-- لو المستخدم عامل login -->
      <div v-if="auth.isAuthenticated && auth.user" class="mt-4 space-y-3">
        <!-- User Info -->
        <router-link
          to="/profile"
          class="flex items-center gap-3 bg-[#162A49] text-white p-3 rounded-2xl"
          @click="isOpen = false"
        >
          <img :src="imageUrl" class="w-10 h-10 rounded-full object-cover shrink-0" />

          <div class="flex-1 min-w-0">
            <div class="font-bold break-words" :title="auth.user.full_name">
              {{ auth.user.full_name }}
            </div>
            <div class="text-xs text-gray-300">
              {{ auth.user.role }}
            </div>
          </div>
        </router-link>

        <!-- Admin Button -->
        <router-link
          v-if="auth.user.role !== 'مخدوم' || auth.user.is_staff"
          to="/admin"
          class="flex items-center justify-between bg-black text-white p-3 rounded-2xl"
          @click="isOpen = false"
        >
          <span>Admin Panel</span>

          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m9 6h1v5h-8v-5h1v-1a3 3 0 1 1 6 0zm-2 0v-1a1 1 0 1 0-2 0v1z"
            />
          </svg>
        </router-link>
      </div>

      <!-- لو مش logged in -->
      <div v-else class="mt-4">
        <button
          @click="
            showLogin = true;
            isOpen = false;
          "
          class="w-full flex items-center justify-center text-white bg-[#D7AB31] py-3 rounded-2xl font-bold"
        >
          تسجيل الدخول
        </button>
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
