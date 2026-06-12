<script setup lang="ts">
import marmina from "@/assets/images/marmina.jpg";
</script>

<template>
  <div class="bg-linear-to-br from-[#263755] to-[#734959] min-h-screen">
    <!-- Title -->
    <div class="flex justify-center pt-10 md:pt-16 text-center px-4">
      <h1 class="text-[#D4AB34] text-2xl md:text-4xl lg:text-5xl font-bold mx-2">قديس اليوم</h1>
      <h1 class="text-white text-2xl md:text-4xl lg:text-5xl font-bold">& آية اليوم</h1>
    </div>

    <!-- Line -->
    <div class="flex justify-center mt-4">
      <div class="border-2 w-24 md:w-40 border-[#D4AB34] rounded-full"></div>
    </div>

    <!-- Grid -->
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-14">
        <!-- Verse Card -->
        <div class="flex flex-col bg-white/10 backdrop-blur-md rounded-3xl w-full">
          <!-- Header -->
          <div class="flex justify-between items-center p-4 md:p-6">
            <h1 class="text-[#f3c43a] text-2xl md:text-4xl font-bold">آية اليوم</h1>

            <div class="text-[#D4AB34]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                class="md:w-15 md:h-15"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 2H6C4.35 2 3 3.35 3 5v14c0 1.65 1.35 3 3 3h15v-2H6c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1m-4 8h-2.5v4h-2v-4H9V8h2.5V6h2v2H16z"
                />
              </svg>
            </div>
          </div>

          <!-- Verse -->
          <div class="text-center text-white px-4 md:px-8 py-6">
            <p class="text-lg md:text-3xl leading-relaxed">
              "لأَنَّهُ هَكَذَا أَحَبَّ اللهُ الْعَالَمَ حَتَّى بَذَلَ ابْنَهُ الْوَحِيدَ، لِكَيْ
              لَا يَهْلِكَ كُلُّ مَنْ يُؤْمِنُ بِهِ، بَلْ تَكُونُ لَهُ الْحَيَاةُ الأَبَدِيَّةُ."
            </p>
            <p class="mt-4 text-amber-400 text-sm md:text-3xl">(يو 3: 16)</p>
          </div>

          <!-- Sections -->
          <div class="px-4 md:px-6 space-y-6 pb-6">
            <div>
              <h2 class="text-[#e9b61e] text-xl md:text-3xl font-bold mb-2">تأمل روحي</h2>
              <p class="text-white text-sm md:text-2xl leading-relaxed">
                محبة الله غير المحدوده تتجلي في تقديم ابنه الوحيد فداءً عنا. هذه الليله تذكرنا بعمق
                محبة الله وتضحيته من اجل خلاصنا الابدي
              </p>
            </div>

            <div class="h-px bg-white/20"></div>

            <div>
              <h2 class="text-[#e9b61e] text-xl md:text-3xl font-bold mb-2">تطبيق اليوم</h2>
              <ul class="list-disc text-white text-sm md:text-2xl pr-5 space-y-1">
                <li>عبر عن محبتك لشخص قريب منك اليوم</li>
                <li>خصص 5 دقائق للصلاه والشكر</li>
                <li>سامح من اساء اليك كما سامحك الله</li>
              </ul>
            </div>

            <div class="h-px bg-white/20"></div>

            <div>
              <h2 class="text-[#e9b61e] text-xl md:text-3xl font-bold mb-2">صلاه قصيره</h2>
              <p class="text-white text-sm md:text-2xl leading-relaxed">
                يارب علمني ان اعيش في نور محبتك كل يوم وان اثق في عملك الكامل من اجلي . اجعل قلبي
                ثابتاً فيك. وممتلئاً سلاماً ورجاءً
              </p>
            </div>
          </div>
        </div>

        <!-- Saint Card -->
        <div class="flex flex-col bg-white/10 backdrop-blur-md rounded-3xl w-full mx-auto">
          <!-- Header -->
          <div class="flex justify-between items-center p-4 md:p-6">
            <h1 class="text-[#f3c43a] text-2xl md:text-4xl font-bold">قديس اليوم</h1>

            <div class="text-[#D4AB34]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                class="md:w-15 md:h-15"
                viewBox="0 0 640 640"
              >
                <path
                  fill="currentColor"
                  d="M448 128c0-35.3-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64s64-28.7 64-64M328.7 328l22.9 31.5c6.5 8.9 16.3 14.7 27.2 16.1s21.9-1.7 30.4-8.7l88-72c17.1-14 19.6-39.2 5.6-56.3s-39.2-19.6-56.3-5.6l-55.2 45.2l-26.2-36c-15.6-21.5-40.6-34.2-67.2-34.2c-30.9 0-59.2 17.1-73.6 44.4l-48.5 92.5c-20.2 38.5-9.4 85.9 25.6 111.8l53.2 39.3H168c-22.1 0-40 17.9-40 40s17.9 40 40 40h208c17.3 0 32.6-11.1 38-27.5s-.3-34.4-14.2-44.7L283.7 418z"
                />
              </svg>
            </div>
          </div>

          <!-- Image -->
          <div class="px-4 md:px-8">
            <img class="rounded-2xl w-full max-w-md mx-auto" :src="marmina" alt="" />
          </div>

          <!-- Content -->
          <div class="text-center px-4 md:px-6 py-6">
            <h2 class="text-[#e9b61e] font-bold text-xl md:text-3xl mb-4">
              القديس مارمينا العجائبي
            </h2>

            <p class="text-white text-sm md:text-lg leading-relaxed">
              شهيد مصري عظيم عاش في القرن الثالث الميلادي. اشتهر بصنع المعجزات والشفاءات. واستشهد من
              اجل ايمانه المسيحي ويعتبر من اعظيم شهداء الكنيسة القبطية
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
