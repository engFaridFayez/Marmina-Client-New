<script setup lang="ts"></script>

<template>
  <div class="bg-[#18294C]">
    <div class="flex justify-center pt-20">
      <h1 class="text-[#D4AB34] text-2xl font-bold md:text-4xl lg:text-5xl mx-3">تواصل</h1>
      <h1 class="text-white text-2xl font-bold md:text-4xl lg:text-5xl">معنا</h1>
    </div>
    <div class="flex justify-center">
      <h1 class="text-white text-xl mt-5">نسعد بتواصلكم بالمدرسه في اي وقت</h1>
    </div>
    <div class="flex justify-center">
      <div class="border-4 mt-6 w-40 text-[#D4AB34] rounded-full"></div>
    </div>

    <div class="flex justify-center px-4 md:px-10 lg:px-20 mt-10 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-2.5 w-full max-w-6xl">
        <div class="bg-[#F5EFE5] p-6 md:p-8 rounded-3xl shadow">
          <form class="flex flex-col gap-4">
            <div>
              <label class="block mb-1 text-[#18294A] font-bold">الاسم الكامل</label>
              <input
                type="text"
                placeholder="ادخل اسمك بالكامل"
                class="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AB34]"
              />
            </div>

            <div>
              <label class="block mb-1 text-[#18294A] font-bold">البريد الالكتروني</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                class="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AB34]"
              />
            </div>

            <div>
              <label class="block mb-1 text-[#18294A] font-bold">رقم الهاتف</label>
              <input
                type="text"
                placeholder="+201234567890"
                class="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#D4AB34]"
              />
            </div>

            <div>
              <label class="block mb-1 text-[#18294A] font-bold">الرسالة</label>
              <textarea
                placeholder="اكتب رسالتك هنا"
                class="w-full p-3 rounded-xl border h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#D4AB34]"
              ></textarea>
            </div>

            <button
              class="bg-[#D4AB34] text-white py-3 rounded-xl font-bold hover:bg-[#18294A] transition cursor-pointer"
            >
              ارسال
            </button>
          </form>
        </div>

        <!-- الكارت التاني (المعلومات) -->
        <div class="bg-[#F5EFE5] p-6 md:p-8 rounded-3xl shadow flex flex-col gap-6">
          <!-- عنصر -->
          <div class="flex items-start gap-3">
            <div class="bg-[#D4AB34] p-3 rounded-full text-pink-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                <g fill="none">
                  <path
                    d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 2a9 9 0 0 1 9 9c0 3.074-1.676 5.59-3.442 7.395a20.4 20.4 0 0 1-2.876 2.416l-.426.29l-.2.133l-.377.24l-.336.205l-.416.242a1.87 1.87 0 0 1-1.854 0l-.416-.242l-.52-.32l-.192-.125l-.41-.273a20.6 20.6 0 0 1-3.093-2.566C4.676 16.589 3 14.074 3 11a9 9 0 0 1 9-9m0 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
                  />
                </g>
              </svg>
            </div>
            <div>
              <h1 class="font-bold text-3xl text-[#18294A]">العنوان</h1>
              <p class="text-gray-600 text-xl">العمرانية - محافظة الجيزة - جمهورية مصر العربية</p>
            </div>
          </div>

          <!-- عنصر -->
          <div class="flex items-start gap-3">
            <div class="bg-[#D4AB34] p-3 rounded-full text-pink-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317"
                />
              </svg>
            </div>
            <div>
              <h1 class="font-bold text-[#18294A] text-3xl">الهاتف</h1>
              <p class="text-gray-600 text-xl">+20 123 456 7890</p>
            </div>
          </div>

          <!-- عنصر -->
          <div class="flex items-start gap-3">
            <div class="bg-[#D4AB34] p-3 rounded-full text-pink-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
                />
              </svg>
            </div>
            <div>
              <h1 class="font-bold text-[#18294A] text-3xl">البريد الالكتروني</h1>
              <p class="text-gray-600 text-xl">example@gmail.com</p>
            </div>
          </div>

          
          <div class="flex flex-col justify-center gap-4 mt-4">
            <!-- Facebook -->
            <a href="https://www.facebook.com/archangelsureil" target="blank" class="bg-[#1877F2] cursor-pointer flex justify-center text-white text-center p-3 w-full rounded-full hover:scale-110 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 2.04C6.48 2.04 2 6.52 2 12.04c0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88c1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99c4.78-.75 8.44-4.89 8.44-9.88c0-5.52-4.48-10-10-10"
                />
              </svg>
              <h1 class="text-3xl mr-3">فيسبوك</h1>
            </a>

            <!-- YouTube -->
            <a href="https://www.youtube.com/@Archangel_Suriel_Deacons" target="blank" class="bg-red-600 cursor-pointer flex justify-center  text-white text-center p-3 w-full rounded-full hover:scale-110 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23.5 6.2a2.9 2.9 0 0 0-2-2c-1.8-.5-9-.5-9-.5s-7.2 0-9 .5a2.9 2.9 0 0 0-2 2C1 8 1 12 1 12s0 4 .5 5.8a2.9 2.9 0 0 0 2 2c1.8.5 9 .5 9 .5s7.2 0 9-.5a2.9 2.9 0 0 0 2-2C24 16 24 12 24 12s0-4-.5-5.8M10 15.5v-7l6 3.5z"
                />
              </svg>
              <h1 class="text-4xl mr-3">يوتيوب</h1>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
