<script setup lang="ts">
import { onMounted, ref } from "vue";

import {
  getDailyReadings,
  getSectionReadings,
  getTodayVerse,
  type DailyReading,
} from "@/services/katameros.service";

const vespersReadings = ref<DailyReading[]>([]);
const matinsReadings = ref<DailyReading[]>([]);
const liturgyReadings = ref<DailyReading[]>([]);

const todayVerse = ref<{
  text: string;
  reference: string;
} | null>(null);

// =========================
// Today's Dates
// =========================
const todayDate = ref<{
  gregorian: string;
  coptic: string;
} | null>(null);

const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const data = await getDailyReadings();

    // التاريخ الميلادي والقبطي
    todayDate.value = data.date;

    // آية اليوم
    todayVerse.value = getTodayVerse(data);

    // القراءات
    vespersReadings.value = getSectionReadings(data, "العشية");
    matinsReadings.value = getSectionReadings(data, "باكر");
    liturgyReadings.value = getSectionReadings(data, "قداس");
  } catch (err) {
    console.error("❌ Katameros API Error:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="bg-linear-to-br from-[#263755] to-[#734959] min-h-screen">
    <!-- Title -->
    <div class="flex flex-wrap justify-center pt-10 md:pt-16 text-center px-4 ml-10">
      <h1 class="text-[#D4AB34] text-2xl md:text-4xl lg:text-5xl font-bold mx-2">
        القطمارس اليومي
      </h1>

      <h1 class="text-white text-2xl md:text-4xl lg:text-5xl font-bold">& آية اليوم</h1>
    </div>

    <!-- Line -->
    <div class="flex justify-center mt-4">
      <div class="border-2 w-24 md:w-40 border-[#D4AB34] rounded-full"></div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-10 space-y-8">
      <!-- ========================= -->
      <!-- Verse Card -->
      <!-- ========================= -->

      <div class="bg-white/10 backdrop-blur-md rounded-3xl w-full overflow-hidden">
        <!-- Header -->
        <div class="flex justify-between items-center p-4 md:p-6">
          <h1 class="text-[#f3c43a] text-xl sm:text-2xl md:text-4xl font-bold">آية اليوم</h1>

          <div class="text-[#D4AB34]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              class="w-8 h-8 sm:w-10 sm:h-10 md:w-15 md:h-15"
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
        <div class="text-center px-4 md:px-10 pb-8">
          <!-- Loading -->
          <div v-if="loading" class="flex justify-center py-8">
            <div
              class="w-10 h-10 border-4 border-[#D4AB34] border-t-transparent rounded-full animate-spin"
            ></div>
          </div>

          <!-- Verse -->
          <template v-else-if="todayVerse">
            <p class="text-white text-base sm:text-lg md:text-2xl lg:text-3xl leading-relaxed">
              "{{ todayVerse.text }}"
            </p>

            <p
              class="mt-5 text-amber-400 text-sm sm:text-base md:text-xl lg:text-2xl font-semibold"
            >
              ({{ todayVerse.reference }})
            </p>
          </template>

          <!-- Error -->
          <p v-else class="text-white text-lg">تعذر تحميل آية اليوم.</p>
        </div>
      </div>

      <!-- ========================= -->
      <!-- Daily Readings -->
      <!-- ========================= -->

      <div>
        <!-- Section Title -->
        <div class="text-center mb-6">
          <h2 class="text-[#f3c43a] text-2xl md:text-4xl font-bold mb-5">قراءات اليوم</h2>
          <h2 class="text-[#d1d2d2] text-md md:text-2xl font-bold">{{ todayDate?.coptic }}</h2>
          <h2 class="text-[#d1d2d2] text-md md:text-2xl font-bold">{{ todayDate?.gregorian }}</h2>

          <div class="flex justify-center mt-3">
            <div class="h-1 w-20 bg-[#D4AB34] rounded-full"></div>
          </div>
        </div>

        <!-- Readings Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- ================= -->
          <!-- Vespers -->
          <!-- ================= -->

          <div class="bg-white/10 backdrop-blur-md rounded-3xl p-5 md:p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-[#f3c43a] text-xl md:text-2xl font-bold">العشية</h3>

              <span class="text-[#D4AB34] text-2xl"> 🌙 </span>
            </div>

            <!-- Readings -->
            <div v-if="vespersReadings.length" class="space-y-5">
              <div
                v-for="(reading, index) in vespersReadings"
                :key="index"
                class="border-b border-white/10 last:border-0 pb-5 last:pb-0"
              >
                <h4 class="text-[#e9b61e] text-lg md:text-xl font-bold">
                  {{ reading.title }}
                </h4>

                <p class="text-white/70 text-sm md:text-base mt-1">
                  {{ reading.reference }}
                </p>

                <p
                  v-if="reading.firstVerse"
                  class="text-white text-sm md:text-base leading-relaxed mt-3"
                >
                  "{{ reading.firstVerse }}"
                </p>
              </div>
            </div>

            <p v-else class="text-white/60 text-sm">لا توجد قراءات متاحة.</p>
          </div>

          <!-- ================= -->
          <!-- Matins -->
          <!-- ================= -->

          <div class="bg-white/10 backdrop-blur-md rounded-3xl p-5 md:p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-[#f3c43a] text-xl md:text-2xl font-bold">باكر</h3>

              <span class="text-[#D4AB34] text-2xl"> 🌅 </span>
            </div>

            <!-- Readings -->
            <div v-if="matinsReadings.length" class="space-y-5">
              <div
                v-for="(reading, index) in matinsReadings"
                :key="index"
                class="border-b border-white/10 last:border-0 pb-5 last:pb-0"
              >
                <h4 class="text-[#e9b61e] text-lg md:text-xl font-bold">
                  {{ reading.title }}
                </h4>

                <p class="text-white/70 text-sm md:text-base mt-1">
                  {{ reading.reference }}
                </p>

                <p
                  v-if="reading.firstVerse"
                  class="text-white text-sm md:text-base leading-relaxed mt-3"
                >
                  "{{ reading.firstVerse }}"
                </p>
              </div>
            </div>

            <p v-else class="text-white/60 text-sm">لا توجد قراءات متاحة.</p>
          </div>

          <!-- ================= -->
          <!-- Liturgy -->
          <!-- ================= -->

          <div class="bg-white/10 backdrop-blur-md rounded-3xl p-5 md:p-6">
            <!-- Header -->
            <div class="flex items-center justify-between mb-5">
              <h3 class="text-[#f3c43a] text-xl md:text-2xl font-bold">القداس</h3>

              <span class="text-[#D4AB34] text-2xl"> ✝️ </span>
            </div>

            <!-- Readings -->
            <div v-if="liturgyReadings.length" class="space-y-5">
              <div
                v-for="(reading, index) in liturgyReadings"
                :key="index"
                class="border-b border-white/10 last:border-0 pb-5 last:pb-0"
              >
                <h4 class="text-[#e9b61e] text-lg md:text-xl font-bold">
                  {{ reading.title }}
                </h4>

                <p class="text-white/70 text-sm md:text-base mt-1">
                  {{ reading.reference }}
                </p>

                <p
                  v-if="reading.firstVerse"
                  class="text-white text-sm md:text-base leading-relaxed mt-3"
                >
                  "{{ reading.firstVerse }}"
                </p>
              </div>
            </div>

            <p v-else class="text-white/60 text-sm">لا توجد قراءات متاحة.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
