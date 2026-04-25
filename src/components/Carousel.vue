<script setup lang="ts">
import back from "@/assets/images/back.jpeg";
</script>

<template>
  <div class="relative w-full h-75 md:h-112.5 lg:h-150 overflow-hidden rounded-1xl">
    <!-- Image -->
    <img :src="back" class="w-full h-full object-cover" alt="banner" />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/50"></div>

    <!-- Center Content -->
    <div class="absolute inset-0 flex items-center justify-center text-center px-4">
      <div>
        <h1 class="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
          مدرسة شمامسة كنيسة الملاك سوريال
        </h1>
        <h1 class="text-[#D7AB31] text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
          والشهيد العظيم مارمينا
        </h1>
        <p class="text-white text-sm md:text-lg lg:text-xl mb-6">
          مرحبا بكم في مدرسة الشمامسه حيث نجتمع بروح واحده لنسبح اسمه القدوس ونتعلم من كلمته المقدسه
        </p>

        <div class="flex items-center justify-center gap-4 flex-wrap">
          <button
            class="bg-[#D7AB31] text-white px-5 py-2 rounded-xl text-sm md:text-base hover:bg-yellow-500 transition flex items-center gap-2"
          >
            <!-- SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path
                  fill="currentColor"
                  fill-opacity="0"
                  stroke-dasharray="20"
                  d="M12 4h2v6h2.5l-4.5 4.5M12 4h-2v6h-2.5l4.5 4.5"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.5s"
                    values="20;0"
                  />
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="0.7s"
                    dur="0.15s"
                    to="0.3"
                  />
                </path>
                <path fill="none" stroke-dasharray="14" stroke-dashoffset="14" d="M6 19h12">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.5s"
                    dur="0.2s"
                    to="0"
                  />
                </path>
              </g>
            </svg>
            <span>استكشف خدامتنا</span>
          </button>

          <button
            class="bg-white px-5 py-2 rounded-xl text-sm md:text-base hover:bg-gray-300 transition flex items-center gap-2"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12.357 16.356q.143-.143.143-.356v-4.5q0-.213-.144-.356T11.999 11t-.356.144t-.143.356V16q0 .213.144.356t.357.144t.356-.144m.077-6.956q.182-.177.182-.438t-.177-.439T12 8.346t-.438.177t-.177.439t.181.438t.434.177t.434-.177m-.43 11.6q-1.867 0-3.511-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              />
            </svg>
            معرفة المزيد
            
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
