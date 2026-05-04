<script setup lang="ts"></script>

<template>
  <div dir="rtl" class="bg-[#F9F5EF] pb-10 px-4 md:px-8 lg:px-16">
    <div class="grid grid-cols-1">
      <div class="col-span-1"></div>
      <div
        class="bg-linear-to-r from-[#232a7e] to-[#D0A633] flex flex-col items-center justify-start w-full h-auto pb-10 md:h-auto md:pb-10 lg:h-auto lg:pb-10 overflow-hidden rounded-2xl"
      >
        <div class="UserImage mt-5">
          <img src="https://i.pravatar.cc/150?img=3" class="w-50 h-50 rounded-full" alt="" />
        </div>
        <div class="text-white text-5xl font-bold mt-3">
          <h1>مينا جمال</h1>
        </div>
        <div class="text-white text-2xl font-bold mt-3">
          <h1>ثالثه اعدادي</h1>
        </div>
        <div class="text-white text-2xl font-bold mt-3">
          <h1>الرقم القومي 123456789</h1>
        </div>
        <div class="text-white text-2xl font-bold mt-3">
          <h1>السن : 15</h1>
        </div>
      </div>
      <div class="col-span-1"></div>
    </div>
    <div class="flex justify-center gap-6 mt-6">
      <div class="bg-white shadow-xl rounded-2xl p-6 w-100 flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="mb-2">
          <path
            fill="currentColor"
            d="M2.5 1.75v11.5c0 .138.112.25.25.25h3.17a.75.75 0 0 1 0 1.5H2.75A1.75 1.75 0 0 1 1 13.25V1.75C1 .784 1.784 0 2.75 0h8.5C12.216 0 13 .784 13 1.75v7.736a.75.75 0 0 1-1.5 0V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25"
          />
        </svg>
        <h1 class="text-xl font-bold">94%</h1>
        <p class="text-gray-500">الحضور</p>
      </div>

      <!-- Card 2 -->
      <div class="bg-white shadow-xl rounded-2xl p-6 w-100 flex flex-col items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="mb-2">
          <path
            fill="currentColor"
            d="M2.5 1.75v11.5c0 .138.112.25.25.25h3.17a.75.75 0 0 1 0 1.5H2.75A1.75 1.75 0 0 1 1 13.25V1.75C1 .784 1.784 0 2.75 0h8.5C12.216 0 13 .784 13 1.75v7.736a.75.75 0 0 1-1.5 0V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25"
          />
        </svg>
        <h1 class="text-xl font-bold">94%</h1>
        <p class="text-gray-500">الحضور</p>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mt-10">
      <div class="lg:col-span-9 bg-[#F7F7F7] w-full rounded-3xl p-6 md:p-8">
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
            <label class="text-gray-500 text-xl font-bold ">الاسم الكامل</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg class="text-[#D5AC4C]" width="40" height="40" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">مينا جمال</span>
            </div>
          </div>

          <!-- Phone -->
          <div>
            <label class="text-gray-500 text-xl font-bold ">رقم الهاتف</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg class="text-[#D5AC4C]" width="40" height="40" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24c1.12.37 2.33.57 3.57.57c.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.85 21 3 13.15 3 3c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1c0 1.24.2 2.45.57 3.57c.11.35.03.74-.25 1.02z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">01276644631</span>
            </div>
          </div>

          <!-- National ID -->
          <div>
            <label class="text-gray-500 text-xl font-bold ">الرقم القومي</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <span class="text-[#D5AC4C] text-3xl font-bold ">#</span>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">123456789</span>
            </div>
          </div>

          <!-- Age -->
          <div>
            <label class="text-gray-500 text-xl font-bold ">العمر</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg class="text-[#D5AC4C]" width="40" height="40" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">15</span>
            </div>
          </div>

          <!-- Grade -->
          <div>
            <label class="text-gray-500 text-xl font-bold ">الصف الدراسي</label>
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
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">ثالثة إعدادي</span>
            </div>
          </div>

          <!-- Role -->
          <div>
            <label class="text-gray-500 text-xl font-bold ">خادم أو مخدوم</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <span class="ml-2 text-[#1B284B]">مخدوم</span>
            </div>
          </div>

          <!-- Join Date (full width) -->
          <div>
            <label class="text-gray-500 text-xl font-bold ">تاريخ الانضمام</label>
            <div class="flex items-center bg-[#EDE7DD] rounded-full px-4 py-3 mt-1">
              <svg class="text-[#D5AC4C]" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20">
                <path
                  fill="currentColor"
                  d="M5.673 0a.7.7 0 0 1 .7.7v1.309h7.517v-1.3a.7.7 0 0 1 1.4 0v1.3H18a2 2 0 0 1 2 1.999v13.993A2 2 0 0 1 18 20H2a2 2 0 0 1-2-1.999V4.008a2 2 0 0 1 2-1.999h2.973V.699a.7.7 0 0 1 .7-.699M1.4 7.742v10.259a.6.6 0 0 0 .6.6h16a.6.6 0 0 0 .6-.6V7.756zm5.267 6.877v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zm-8.333-3.977v1.666H5v-1.666zm4.166 0v1.666H9.167v-1.666zm4.167 0v1.666h-1.667v-1.666zM4.973 3.408H2a.6.6 0 0 0-.6.6v2.335l17.2.014V4.008a.6.6 0 0 0-.6-.6h-2.71v.929a.7.7 0 0 1-1.4 0v-.929H6.373v.92a.7.7 0 0 1-1.4 0z"
                />
              </svg>
              <span class="ml-2 mr-3 text-xl text-[#1B284B]">2023-09-01</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="lg:col-span-3 bg-white w-full rounded-2xl p-4">LOOOLLLl</div> -->
    </div>
  </div>
</template>
