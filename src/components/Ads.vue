<script setup lang="ts"></script>

<template>
  <div class="bg-[#F5EFE5]">
    <div class="flex justify-center pt-20">
      <h1 class="text-[#18294A] text-2xl font-bold md:text-4xl lg:text-5xl mx-3">إعلانات</h1>
      <h1 class="text-[#D4AB34] text-2xl font-bold md:text-4xl lg:text-5xl">المدرسة</h1>
    </div>
    <div class="flex justify-center">
      <div class="border-4 mt-6 w-40 text-[#D4AB34] rounded-full"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 md:px-10 lg:px-20 mt-10 pb-10">
      <div
        class="bg-white flex items-start md:items-center gap-4 p-5 rounded-3xl shadow hover:shadow-lg transition"
      >
        <!-- الايقونة -->
        <div
          class="bg-green-300 text-green-900 p-3 rounded-full flex items-center justify-center shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18 12.22V9l-5-2.5V5h2V3h-2V1h-2v2H9v2h2v1.5L6 9v3.22L2 14v8h8v-3c0-1.1.9-2 2-2s2 .9 2 2v3h8v-8zm-6 1.28c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5"
            />
          </svg>
        </div>

        <!-- النص -->
        <div class="flex flex-col text-right">
          <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#18294A]">
            موعد القداس الالهي
          </h1>

          <h2 class="text-sm md:text-base lg:text-lg text-gray-500">12 يناير 2025</h2>

          <p class="text-sm md:text-base lg:text-lg text-gray-700 mt-1 leading-relaxed">
            يقام القداس الالهي كل يوم احد الساعه 8 صباحاً
          </p>
        </div>
      </div>
      <div
        class="bg-white flex items-start md:items-center gap-4 p-5 rounded-3xl shadow hover:shadow-lg transition"
      >
        <!-- الايقونة -->
        <div
          class="bg-purple-300 text-purple-900 p-3 rounded-full flex items-center justify-center shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M9 11a4 4 0 1 0-4-4a4 4 0 0 0 4 4m8 2a3 3 0 1 0-3-3a3 3 0 0 0 3 3m4 7a1 1 0 0 0 1-1a5 5 0 0 0-8.06-3.95A7 7 0 0 0 2 20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1"
            />
          </svg>
        </div>

        <!-- النص -->
        <div class="flex flex-col text-right">
          <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#18294A]">
            اجتماع الشمامسة العام
          </h1>

          <h2 class="text-sm md:text-base lg:text-lg text-gray-500">18 يناير 2025</h2>

          <p class="text-sm md:text-base lg:text-lg text-gray-700 mt-1 leading-relaxed">
            اجتماع الشمامسة يوم الخميس من كل شهر الساعه 7 م
          </p>
        </div>
      </div>
      <div
        class="bg-white flex items-start md:items-center gap-4 p-5 rounded-3xl shadow hover:shadow-lg transition"
      >
        <!-- الايقونة -->
        <div
          class="bg-blue-300 text-blue-900 p-3 rounded-full flex items-center justify-center shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <g
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
            >
              <path
                d="M13 15c-2.292 6-8.708 0-11 6m13.5-6h1.501c2.357 0 3.536 0 4.268-.732s.732-1.911.732-4.268V8c0-2.357 0-3.536-.732-4.268S19.36 3 17.001 3h-4c-2.357 0-3.535 0-4.267.732c-.62.62-.716 1.561-.73 3.268"
              />
              <circle cx="7.5" cy="12.5" r="2.5" />
              <path d="M12 7h6m0 4h-3" />
            </g>
          </svg>
        </div>

        <!-- النص -->
        <div class="flex flex-col text-right">
          <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#18294A]">
            تعديل مناهج الطقس
          </h1>

          <h2 class="text-sm md:text-base lg:text-lg text-gray-500">12 يناير 2025</h2>

          <p class="text-sm md:text-base lg:text-lg text-gray-700 mt-1 leading-relaxed">
            تم تعديل منهج الطقس
          </p>
        </div>
      </div>
      <div
        class="bg-white flex items-start md:items-center gap-4 p-5 rounded-3xl shadow hover:shadow-lg transition"
      >
        <!-- الايقونة -->
        <div
          class="bg-pink-300 text-pink-900 p-3 rounded-full flex items-center justify-center shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M18 6q-.825 0-1.412-.587T16 4t.588-1.412T18 2t1.413.588T20 4t-.587 1.413T18 6m-1 15v-7q0-1-.513-1.8t-1.312-1.25l.875-2.575q.2-.625.738-1T18 7t1.213.375t.737 1l2.1 6.3q.175.5-.137.913T21.1 16H20v5q0 .425-.288.713T19 22h-1q-.425 0-.712-.288T17 21m-5.562-9.937Q11 10.625 11 10t.438-1.062T12.5 8.5t1.063.438T14 10t-.437 1.063t-1.063.437t-1.062-.437M5.5 6q-.825 0-1.412-.587T3.5 4t.588-1.412T5.5 2t1.413.588T7.5 4t-.587 1.413T5.5 6m-2 15v-6H3q-.425 0-.712-.288T2 14V9q0-.825.588-1.412T4 7h3q.825 0 1.413.588T9 9v5q0 .425-.288.713T8 15h-.5v6q0 .425-.288.713T6.5 22h-2q-.425 0-.712-.288T3.5 21m7.5 0v-3q-.425 0-.712-.288T10 17v-3q0-.625.438-1.062T11.5 12.5h2q.625 0 1.063.438T15 14v3q0 .425-.288.713T14 18v3q0 .425-.288.713T13 22h-1q-.425 0-.712-.288T11 21"
            />
          </svg>
        </div>

        <!-- النص -->
        <div class="flex flex-col text-right">
          <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#18294A]">الاسر التمهيديه</h1>

          <h2 class="text-sm md:text-base lg:text-lg text-gray-500">12 يناير 2025</h2>

          <p class="text-sm md:text-base lg:text-lg text-gray-700 mt-1 leading-relaxed">
            اعرف معلومات عن الاسر التمهيديه الجديده في المدرسه
          </p>
        </div>
      </div>
      <div
        class="bg-white flex items-start md:items-center gap-4 p-5 rounded-3xl shadow hover:shadow-lg transition"
      >
        <!-- الايقونة -->
        <div
          class="bg-cyan-300 text-cyan-900 p-3 rounded-full flex items-center justify-center shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M12.75 11.38V6h-1.5v6l4.243 4.243l1.06-1.06zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10"
            />
          </svg>
        </div>

        <!-- النص -->
        <div class="flex flex-col text-right">
          <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#18294A]">
            مواعيد تقديم استمارة الاشتراك
          </h1>

          <h2 class="text-sm md:text-base lg:text-lg text-gray-500">12 يناير 2025</h2>

          <p class="text-sm md:text-base lg:text-lg text-gray-700 mt-1 leading-relaxed">
            اخر ميعاد لتقديم استمارة الالتحاق بالمدرسه يوم الخميس الموافق 10 يناير
          </p>
        </div>
      </div>
      <div
        class="bg-white flex items-start md:items-center gap-4 p-5 rounded-3xl shadow hover:shadow-lg transition"
      >
        <!-- الايقونة -->
        <div
          class="bg-orange-300 text-orange-900 p-3 rounded-full flex items-center justify-center shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
            <path
              fill="currentColor"
              d="m41.759 25.64l.364-.64C45.99 18.304 43.696 9.742 37 5.876S21.741 4.304 17.875 11l-.126.218a1.51 1.51 0 0 0 .523 2.052l9.722 5.874l-5.386 8.918c-4.71.415-8.735 2.915-10.9 6.452q.18-.017.364-.013a3.25 3.25 0 0 1 2.1.827C16.144 32.492 19.704 30.5 24 30.5s7.858 1.993 9.83 4.83a3.25 3.25 0 0 1 2.462-.817c-2.145-3.504-6.116-5.99-10.771-6.44l4.612-7.636l9.531 5.758a1.51 1.51 0 0 0 2.094-.554M37.676 9.435c3.91 3.498 5.019 9.335 2.408 14.094l-4.874-2.945l.017-.028c.12-.19.282-.461.468-.807c.372-.691.841-1.684 1.243-2.91c.64-1.949 1.118-4.517.738-7.404M33.42 7.018c-2.149.966-4.004 2.565-5.38 3.99a29 29 0 0 0-2.863 3.48l-.017.023l-4.745-2.867C23.27 7.33 28.617 5.517 33.42 7.018m-6.115 8.789a26.4 26.4 0 0 1 2.532-3.062c1.478-1.53 3.309-3.01 5.245-3.704c.511 2.717.09 5.163-.519 7.018a15.6 15.6 0 0 1-1.07 2.504a12 12 0 0 1-.423.727zm9.394 20.907a1.25 1.25 0 0 0-.676-.213h-.049a1.25 1.25 0 0 0-1.16.854l-.001.003C34.77 37.475 33.517 41 30 41c-3.52 0-4.765-3.5-4.814-3.646a1.25 1.25 0 0 0-2.372 0l-.001.003C22.77 37.475 21.517 41 18 41c-3.52 0-4.765-3.5-4.81-3.646a1.24 1.24 0 0 0-.444-.611a1.25 1.25 0 0 0-.715-.243h-.022a1.25 1.25 0 0 0-1.173.805c-.017.045-1.738 4.445-5.582 4.445a1.25 1.25 0 0 0 0 2.5A8.2 8.2 0 0 0 12 40.35a7.3 7.3 0 0 0 12 .006a7.3 7.3 0 0 0 12-.006a8.2 8.2 0 0 0 6.75 3.9a1.25 1.25 0 1 0 0-2.5c-2.48 0-4.088-1.863-4.914-3.177v-.002a8.5 8.5 0 0 1-.667-1.266a1.25 1.25 0 0 0-.47-.592"
            />
          </svg>
        </div>

        <!-- النص -->
        <div class="flex flex-col text-right">
          <h1 class="text-xl md:text-2xl lg:text-3xl font-bold text-[#18294A]">
            مؤتمر الشمامسة السنوي
          </h1>

          <h2 class="text-sm md:text-base lg:text-lg text-gray-500">12 يناير 2025</h2>

          <p class="text-sm md:text-base lg:text-lg text-gray-700 mt-1 leading-relaxed">
            يبدأ المؤتمر في الاسبوع الثاني من شهر 9 سنة 2026
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
