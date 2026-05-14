<script setup lang="ts">
import router from "@/router";
import { useAuthStore } from "@/stores/auth";
import { computed } from "vue";
import { useToast } from "vue-toastification";
import unknown from "@/assets/images/default.jpg";
const auth = useAuthStore();
const toast = useToast();

const handleLogout = () => {
  try {
    auth.logout();
    toast.success("تم تسجيل خروجك");
    router.push("/");
  } catch (error) {
    toast.error("فشل تسجيل الخروج");
  }
};

const imageUrl = computed(() => {
  if (!auth.user?.image) return unknown;
  return auth.user.image.startsWith("http")
    ? auth.user.image
    : `http://127.0.0.1:8000${auth.user.image}`;
});
</script>

<template>
  <div dir="rtl" class="bg-[#F9F5EF] pb-10 px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1">
      <div class="col-span-1"></div>
      <div
        v-if="auth.user"
        class="bg-linear-to-r from-[#232a7e] to-[#D0A633] flex flex-col items-center justify-start w-full h-auto pb-10 md:h-auto md:pb-10 lg:h-auto lg:pb-10 overflow-hidden rounded-2xl"
      >
        <div class="UserImage mt-5">
          <img :src="imageUrl" class="w-50 h-50 rounded-full object-cover" alt="" />
        </div>
        <div class="text-white text-4xl font-bold mt-3">
          <h1>{{ auth.user.full_name }}</h1>
        </div>
        <div
          class="text-white text-2xl font-bold mt-3 bg-linear-to-r from-[#fecd48] to-[#000000] shadow-2xl p-2 rounded-3xl"
        >
          <h1>{{ auth.user.role }}</h1>
        </div>
        <div class="text-white text-2xl font-bold mt-3">
          <h1>{{ auth.user.username }}</h1>
        </div>
        <div class="text-white text-2xl font-bold mt-3">
          <h1>{{ auth.user.email }}</h1>
        </div>
        <div class="text-white text-2xl font-bold mt-3 bg-gray-600 rounded-3xl px-4 py-2">
          <h1>{{ auth.user.slogan }}</h1>
        </div>
      </div>
      <div class="col-span-1"></div>
    </div>
    <div class="flex justify-center gap-6 mt-6">
      <router-link
        to="/att-terms"
        class="bg-white shadow-xl rounded-2xl p-6 w-100 flex flex-col items-center hover:bg-gray-200 transition ease-in"
      >
        <svg
          class="text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 2a14 14 0 1 0 14 14A14 14 0 0 0 16 2m-2 19.59l-5-5L10.59 15L14 18.41L21.41 11l1.596 1.586Z"
          />
          <path fill="none" d="m14 21.591l-5-5L10.591 15L14 18.409L21.41 11l1.595 1.585z" />
        </svg>
        <h1 class="text-2xl font-bold mt-2">94%</h1>
        <p class="text-gray-500 text-xl">الحضور</p>
        <p class="text-blue-500 text-xl">شوف حضورك كامل من هنا</p>
      </router-link>

      <!-- Card 2 -->
      <div class="bg-white shadow-xl rounded-2xl p-6 w-100 flex flex-col items-center">
        <svg
          class="text-yellow-400"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
        >
          <g fill="none" stroke="currentColor" stroke-width="1.5">
            <path
              stroke-linecap="round"
              d="M16 22v-9c0-1.414 0-2.121-.44-2.56C15.122 10 14.415 10 13 10h-2c-1.414 0-2.121 0-2.56.44C8 10.878 8 11.585 8 13v9m0 0c0-1.414 0-2.121-.44-2.56C7.122 19 6.415 19 5 19s-2.121 0-2.56.44C2 19.878 2 20.585 2 22m20 0v-3c0-1.414 0-2.121-.44-2.56C21.122 16 20.415 16 19 16s-2.121 0-2.56.44C16 16.878 16 17.585 16 19v3"
            />
            <path
              d="M11.146 3.023C11.526 2.34 11.716 2 12 2s.474.34.854 1.023l.098.176c.108.194.162.29.246.354c.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532s-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354s-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352c-.23.175-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.136-.399-.136s-.202.046-.399.136l-.178.082c-.691.318-1.037.478-1.267.303c-.23-.174-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438s-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165c.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135c.084-.064.138-.16.246-.354z"
            />
          </g>
        </svg>
        <h1 class="text-2xl font-bold mt-2">Rank</h1>
        <p class="text-gray-500 text-xl font-bold">3</p>
      </div>
    </div>
    <div v-if="auth.user" class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mt-10">
      <div class="md:col-span-12 lg:col-span-8 bg-[#F7F7F7] w-full rounded-3xl p-6 md:p-8">
        <!-- Header -->
        <div class="flex items-center gap-2 mb-6">
          <svg class="text-[#D5AC4C]" width="40" height="40" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
            />
          </svg>
          <h1 class="text-3xl font-bold text-[#1B284B]">المعلومات الشخصية</h1>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
          <!-- Field -->
          <div>
            <label class="text-gray-500 text-xl font-bold">الاسم الكامل</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg class="text-[#D5AC4C]" width="40" height="40" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">{{ auth.user.full_name }}</span>
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="text-gray-500 text-xl font-bold">رقم الهاتف</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg class="text-[#D5AC4C]" width="40" height="40" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.85 21 3 13.15 3 3c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.24.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">{{ auth.user.phone }}</span>
            </div>
          </div>

          <div v-if="auth.user.role == 'خادم عادي' || auth.user.role == 'امين اسرة'">
            <label class="text-gray-500 text-xl font-bold">الاسرة</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v4.51a3.29 3.29 0 0 0-3.606.702l-5.903 5.903a3.7 3.7 0 0 0-.97 1.712l-.105.423H4.75A2.75 2.75 0 0 1 2 17.25zM16.5 8h-9a1.5 1.5 0 1 0 0 3h9a1.5 1.5 0 0 0 0-3m2.6 4.67l-5.903 5.902a2.7 2.7 0 0 0-.706 1.247l-.458 1.831a1.087 1.087 0 0 0 1.319 1.318l1.83-.457a2.7 2.7 0 0 0 1.248-.707l5.902-5.902A2.286 2.286 0 0 0 19.1 12.67"
                />
              </svg>
              <div></div>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]"
                >{{ auth.user.family?.name }} - {{ auth.user.family?.year }}</span
              >
            </div>
          </div>

          <div v-if="auth.user.role == 'خادم عادي'">
            <label class="text-gray-500 text-xl font-bold">اللقب</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v4.51a3.29 3.29 0 0 0-3.606.702l-5.903 5.903a3.7 3.7 0 0 0-.97 1.712l-.105.423H4.75A2.75 2.75 0 0 1 2 17.25zM16.5 8h-9a1.5 1.5 0 1 0 0 3h9a1.5 1.5 0 0 0 0-3m2.6 4.67l-5.903 5.902a2.7 2.7 0 0 0-.706 1.247l-.458 1.831a1.087 1.087 0 0 0 1.319 1.318l1.83-.457a2.7 2.7 0 0 0 1.248-.707l5.902-5.902A2.286 2.286 0 0 0 19.1 12.67"
                />
              </svg>
              <div></div>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">خادم</span>
            </div>
          </div>

          <div v-if="auth.user.role == 'امين اسرة'">
            <label class="text-gray-500 text-xl font-bold">اللقب</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v4.51a3.29 3.29 0 0 0-3.606.702l-5.903 5.903a3.7 3.7 0 0 0-.97 1.712l-.105.423H4.75A2.75 2.75 0 0 1 2 17.25zM16.5 8h-9a1.5 1.5 0 1 0 0 3h9a1.5 1.5 0 0 0 0-3m2.6 4.67l-5.903 5.902a2.7 2.7 0 0 0-.706 1.247l-.458 1.831a1.087 1.087 0 0 0 1.319 1.318l1.83-.457a2.7 2.7 0 0 0 1.248-.707l5.902-5.902A2.286 2.286 0 0 0 19.1 12.67"
                />
              </svg>
              <div></div>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">امين اسرة</span>
            </div>
          </div>

          <div v-if="auth.user.role == 'امين مرحلة'">
            <label class="text-gray-500 text-xl font-bold">اللقب</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v4.51a3.29 3.29 0 0 0-3.606.702l-5.903 5.903a3.7 3.7 0 0 0-.97 1.712l-.105.423H4.75A2.75 2.75 0 0 1 2 17.25zM16.5 8h-9a1.5 1.5 0 1 0 0 3h9a1.5 1.5 0 0 0 0-3m2.6 4.67l-5.903 5.902a2.7 2.7 0 0 0-.706 1.247l-.458 1.831a1.087 1.087 0 0 0 1.319 1.318l1.83-.457a2.7 2.7 0 0 0 1.248-.707l5.902-5.902A2.286 2.286 0 0 0 19.1 12.67"
                />
              </svg>
              <div></div>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">امين مرحلة</span>
            </div>
          </div>

          <div v-if="auth.user.role == 'امين الشمامسة'">
            <label class="text-gray-500 text-xl font-bold">اللقب</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 6.75A2.75 2.75 0 0 1 4.75 4h14.5A2.75 2.75 0 0 1 22 6.75v4.51a3.29 3.29 0 0 0-3.606.702l-5.903 5.903a3.7 3.7 0 0 0-.97 1.712l-.105.423H4.75A2.75 2.75 0 0 1 2 17.25zM16.5 8h-9a1.5 1.5 0 1 0 0 3h9a1.5 1.5 0 0 0 0-3m2.6 4.67l-5.903 5.902a2.7 2.7 0 0 0-.706 1.247l-.458 1.831a1.087 1.087 0 0 0 1.319 1.318l1.83-.457a2.7 2.7 0 0 0 1.248-.707l5.902-5.902A2.286 2.286 0 0 0 19.1 12.67"
                />
              </svg>
              <div></div>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">امين الشمامسة</span>
            </div>
          </div>

          <!-- Grade -->
          <div>
            <label class="text-gray-500 text-xl font-bold">تاريخ الميلاد</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .825-.587 1.413T18 22zm5-18v6.125q0 .3.238.438t.512-.013l1.225-.725q.25-.15.513-.15t.512.15l1.225.725q.275.15.525.013t.25-.438V4z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">{{ auth.user.birth_date }}</span>
            </div>
          </div>
          <!-- Join Date (full width) -->
          <div>
            <label class="text-gray-500 text-xl font-bold">تاريخ الانضمام للمدرسة</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">{{ auth.user.joined_date }}</span>
            </div>
          </div>

          <div>
            <label class="text-gray-500 text-xl font-bold">الايميل</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">{{ auth.user.email }}</span>
            </div>
          </div>

          <div>
            <label class="text-gray-500 text-xl font-bold">العنوان</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">{{ auth.user.address }}</span>
            </div>
          </div>
          <div>
            <label class="text-gray-500 text-xl font-bold">رقم الواتساب</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">{{ auth.user.whatsapp }}</span>
            </div>
          </div>
          <div>
            <label class="text-gray-500 text-xl font-bold">رقم تليفون الاب</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">{{ auth.user.parent_phone }}</span>
            </div>
          </div>
          <div>
            <label class="text-gray-500 text-xl font-bold">اب الاعتراف</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg
                class="text-[#D5AC4C]"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">{{ auth.user.father }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="md:col-span-12 lg:col-span-4 bg-white w-full rounded-2xl p-4">
        <h1 class="text-3xl font-bold text-[#1B284B] pb-5">القائمه السريعة</h1>
        <div class="flex flex-col">
          <router-link
            to="/terms"
            class="flex mb-3 bg-blue-100 px-3 py-2 rounded-3xl hover:bg-blue-300 transition ease-in cursor-pointer"
          >
            <div class="bg-blue-200 text-blue-600 text-2xl rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                <g fill="none">
                  <path
                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                  />
                  <path
                    fill="currentColor"
                    d="M16 3a3 3 0 0 1 2.995 2.824L19 6v10h.75c.647 0 1.18.492 1.244 1.122l.006.128V19a3 3 0 0 1-2.824 2.995L18 22H8a3 3 0 0 1-2.995-2.824L5 19V9H3.25a1.25 1.25 0 0 1-1.244-1.122L2 7.75V6a3 3 0 0 1 2.824-2.995L5 3zm0 2H7v14a1 1 0 1 0 2 0v-1.75c0-.69.56-1.25 1.25-1.25H17V6a1 1 0 0 0-1-1m3 13h-8v1c0 .35-.06.687-.17 1H18a1 1 0 0 0 1-1zm-7-6a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2zm2-4a1 1 0 1 1 0 2h-4a1 1 0 0 1 0-2zM5 5a1 1 0 0 0-.993.883L4 6v1h1z"
                  />
                </g>
              </svg>
            </div>
            <div>
              <h1 class="text-xl p-3 font-bold text-[#1B284B]">نتيجتك</h1>
            </div>
          </router-link>
          <div
            class="flex mb-3 bg-pink-100 px-3 py-2 rounded-3xl hover:bg-pink-300 transition ease-in cursor-pointer"
          >
            <div class="bg-pink-200 text-pink-600 text-2xl rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-xl p-3 font-bold text-[#1B284B]">المفضلة</h1>
            </div>
          </div>
          <div
            class="flex mb-3 bg-yellow-100 px-3 py-2 rounded-3xl hover:bg-yellow-300 transition ease-in cursor-pointer"
          >
            <div class="bg-yellow-200 text-yellow-600 text-2xl rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4 19v-2h2v-7q0-2.075 1.25-3.687T10.5 4.2V2h3v2.2q2 .5 3.25 2.113T18 10v7h2v2zm8 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-4-5h8v-7q0-1.65-1.175-2.825T12 6T9.175 7.175T8 10z"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-xl p-3 font-bold text-[#1B284B]">الاشعارات</h1>
            </div>
          </div>
          <div
            class="flex mb-3 bg-gray-100 px-3 py-2 rounded-3xl hover:bg-gray-300 transition ease-in cursor-pointer"
          >
            <div class="bg-gray-200 text-gray-600 text-2xl rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12"
                />
              </svg>
            </div>
            <div>
              <h1 class="text-xl p-3 font-bold text-[#1B284B]">الاعدادات</h1>
            </div>
          </div>

          <div
            class="flex mb-3 mt-10 self-center bg-red-100 px-10 py-2 rounded-2xl hover:bg-red-600 transition ease-in cursor-pointer"
          >
            <div class="bg-red-200 text-red-600 text-2xl rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                <path fill="currentColor" d="M5 5h7V3H3v18h9v-2H5z" />
                <path fill="currentColor" d="m21 12l-4-4v3H9v2h8v3z" />
              </svg>
            </div>
            <div @click="handleLogout">
              <h1 class="text-2xl p-3 font-bold text-[#1B284B]">تسجيل الخروج</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
