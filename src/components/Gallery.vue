<script setup lang="ts">
import img1 from "@/assets/images/Gallery/img1.jpg";
import img2 from "@/assets/images/Gallery/img2.jpg";
import img3 from "@/assets/images/Gallery/img3.jpg";
import img4 from "@/assets/images/Gallery/img4.jpg";
import img5 from "@/assets/images/Gallery/img5.jpg";
import img6 from "@/assets/images/Gallery/img6.jpg";
import img7 from "@/assets/images/Gallery/img7.jpg";
import img8 from "@/assets/images/Gallery/img8.jpg";
import img9 from "@/assets/images/Gallery/img9.jpg";
import img10 from "@/assets/images/Gallery/img10.jpg";
import img11 from "@/assets/images/Gallery/img11.jpg";
import { onMounted, ref, onUnmounted } from "vue";
const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

const selectedIndex = ref<number | null>(null);

const openImage = (index: number) => {
  selectedIndex.value = index;
};

const closeImage = () => {
  selectedIndex.value = null;
};

const nextImage = () => {
  if (selectedIndex.value !== null) {
    selectedIndex.value = (selectedIndex.value + 1) % images.length;
  }
};

const prevImage = () => {
  if (selectedIndex.value !== null) {
    selectedIndex.value = (selectedIndex.value - 1 + images.length) % images.length;
  }
};

const handleKey = (e: KeyboardEvent) => {
  if (selectedIndex.value === null) return;

  if (e.key === "Escape") {
    closeImage();
  } else if (e.key === "ArrowLeft") {
    nextImage();
  } else if (e.key === "ArrowRight") {
    prevImage();
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKey);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKey);
});
</script>

<template>
  <div class="bg-[#F5EFE5] pb-20">
    <!-- العنوان -->
    <div class="flex justify-center pt-20">
      <h1 class="text-[#18294A] text-2xl font-bold md:text-4xl lg:text-5xl mx-3">معرض</h1>
      <h1 class="text-[#D4AB34] text-2xl font-bold md:text-4xl lg:text-5xl">الصور</h1>
    </div>

    <div class="flex justify-center">
      <h1 class="text-[#18294A] text-xl mt-5">لحظات مباركة من حياة كنيستنا</h1>
    </div>

    <div class="flex justify-center">
      <div class="border-4 mt-6 w-40 text-[#D4AB34] rounded-full"></div>
    </div>

    <!-- الجاليري -->
    <div class="px-4 md:px-10 lg:px-20 mt-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div
          v-for="(img, index) in images"
          :key="index"
          class="group relative overflow-hidden rounded-2xl cursor-pointer"
          @click="openImage(index)"
        >
          <!-- الصورة -->
          <img
            :src="img"
            class="w-full h-64 object-cover transition duration-500 group-hover:scale-110"
          />

          <!-- overlay -->
          <div
            class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center"
          >
            <span class="text-white text-lg font-bold">عرض</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-10 w-full">
      <button
        class="bg-amber-300 px-6 py-3 rounded-3xl text-2xl hover:text-white hover:bg-[#18294A] cursor-pointer transition ease-in"
      >
        عرض جميع الصور
      </button>
    </div>

    <!-- 🔥 Lightbox -->
    <div
      v-if="selectedIndex !== null"
      class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition duration-300"
      @click="closeImage"
    >
      <!-- زرار الإغلاق -->
      <button class="absolute top-5 right-5 text-white text-3xl cursor-pointer hover:text-black transition ease-in" @click.stop="closeImage">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m12 16l3.644 3.644a1.21 1.21 0 0 0 1.712 0l2.288-2.288a1.21 1.21 0 0 0 0-1.712L16 12l3.644-3.644a1.21 1.21 0 0 0 0-1.712l-2.288-2.288a1.21 1.21 0 0 0-1.712 0L12 8L8.356 4.356a1.21 1.21 0 0 0-1.712 0L4.356 6.644a1.21 1.21 0 0 0 0 1.712L8 12l-3.644 3.644a1.21 1.21 0 0 0 0 1.712l2.288 2.288a1.21 1.21 0 0 0 1.712 0z"
          />
        </svg>
      </button>

      <!-- الصورة -->
      <img
        :src="images[selectedIndex]"
        class="max-w-[90%] max-h-[80%] rounded-2xl shadow-lg transition duration-300"
        @click.stop
      />

      <!-- prev -->
      <button
        class="absolute left-5 text-[#18294A] text-4xl bg-amber-300 p-4 rounded-full cursor-pointer hover:text-white hover:bg-[#18294A] transition ease-in"
        @click.stop="nextImage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 15 15">
          <path fill="currentColor" d="M3 7.5L11 0v15z" />
        </svg>
      </button>

      <!-- next -->
      <button
        class="absolute right-5 text-[#18294A] text-4xl bg-amber-300 p-4 rounded-full cursor-pointer hover:text-white hover:bg-[#18294A] transition ease-in"
        @click.stop="prevImage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 15 15">
          <path fill="currentColor" d="M12 7.5L4 0v15z" />
        </svg>
      </button>
    </div>
  </div>
</template>
