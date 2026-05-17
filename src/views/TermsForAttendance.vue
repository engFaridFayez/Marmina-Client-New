<script lang="ts" setup>
import { useAttendanceStore } from "@/stores/attendance";
import { useResultStore } from "@/stores/results";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useAttendanceStore();
const router = useRouter();

onMounted(() => {
  store.getExamsList();
});

const openTerm = (id: number) => {
  router.push({
    name: "my-attendance",
    params: {
      termId: id,
    },
  });
};
</script>

<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-start pt-10"
    style="background-image: url(&quot;/src/assets/images/resBack.jpeg&quot;)"
    dir="rtl"
  >
    <h1 class="text-white text-5xl font-bold text-center w-full mb-6">الحضور والغياب</h1>
    <div class="w-full max-w-6xl p-6">
      <h1 class="text-2xl flex justify-center items-center m-auto text-white font-bold mb-6">
        📚 اختر الترم
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="exam in store.terms"
          :key="exam.id"
          @click="openTerm(exam.id)"
          class="cursor-pointer bg-[#FFF9D2] rounded-2xl shadow hover:shadow-xl transition p-6 border"
        >
          <h2 class="text-xl font-bold text-gray-800">
            {{ exam.name }}
          </h2>

          <p class="text-gray-500 mt-2">
            {{ exam.year }}
          </p>

          <div class="mt-4 text-blue-600 font-semibold">شوف حضورك وغيابك →</div>
        </div>
      </div>
    </div>
  </div>
</template>
