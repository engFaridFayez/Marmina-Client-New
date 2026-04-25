<script setup lang="ts">
import ephram from "@/assets/images/ephram.jpg";
import abamon from "@/assets/images/abamon.jpg";
import arsan from "@/assets/images/arsan.jpg";
import philo from "@/assets/images/philo.jpg";
import sorial from "@/assets/images/sorial.jpg";
import sarg from "@/assets/images/sarg.jpeg";
</script>

<template>
  <div class="bg-[#18294A]">
    <div class="flex justify-center pt-20">
      <h1 class="text-[#D4AB34] text-2xl font-bold md:text-4xl lg:text-5xl mx-3">آباؤنا</h1>
      <h1 class="text-white text-2xl font-bold md:text-4xl lg:text-5xl">الكهنة</h1>
    </div>
    <div class="flex justify-center">
      <h1 class="text-white text-xl mt-5">خدام الأسرار المقدسة ورعاة النفوس</h1>
    </div>
    <div class="flex justify-center">
      <div class="border-4 mt-6 w-40 text-[#D4AB34] rounded-full"></div>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 px-6 pb-20 mt-15"
    >
      <div class="flex flex-col items-center justify-center bg-[#243553] p-10 md:p-14 rounded-3xl">
        <img :src="sorial" class="rounded-full w-25 h-25 object-cover" alt="" />
        <h1 class="text-[#D4AB34] text-2xl font-bold mt-2 flex justify-center text-center">
          القمص سوريال كامل
        </h1>
      </div>
      <div class="flex flex-col items-center justify-center bg-[#243553] p-10 md:p-10 rounded-3xl">
        <img :src="ephram" class="rounded-full w-25 h-25 object-cover" alt="" />
        <h1 class="text-[#D4AB34] text-2xl font-bold mt-2 flex justify-center text-center">
          القمص افرام أسعد
        </h1>
      </div>
      <div class="flex flex-col items-center justify-center bg-[#243553] p-10 md:p-14 rounded-3xl">
        <img :src="abamon" class="rounded-full w-25 h-25 object-cover" alt="" />
        <h1 class="text-[#D4AB34] text-2xl font-bold mt-2 flex justify-center text-center">
          القس ابامون حنا
        </h1>
      </div>
      <div class="flex flex-col items-center justify-center bg-[#243553] p-10 md:p-14 rounded-3xl">
        <img :src="philo" class="rounded-full w-25 h-25 object-cover" alt="" />
        <h1 class="text-[#D4AB34] text-2xl font-bold mt-2 flex justify-center text-center">
          القس فيلوثاؤس عياد
        </h1>
      </div>
      <div class="flex flex-col items-center justify-center bg-[#243553] p-10 md:p-14 rounded-3xl">
        <img :src="sarg" class="rounded-full w-25 h-25 object-cover" alt="" />
        <h1 class="text-[#D4AB34] text-2xl font-bold mt-2 flex justify-center text-center">
          القس سرجيوس الزوق
        </h1>
      </div>
      <div class="flex flex-col items-center justify-center bg-[#243553] p-10 md:p-14 rounded-3xl">
        <img :src="arsan" class="rounded-full w-25 h-25 object-cover" alt="" />
        <h1 class="text-[#D4AB34] text-2xl font-bold mt-2 flex justify-center text-center">
          القس ارسانيوس نصيف
        </h1>
      </div>
    </div>
  </div>
</template>
