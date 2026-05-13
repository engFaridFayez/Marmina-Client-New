<script lang="ts" setup>
import { useResultStore } from "@/stores/results";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const store = useResultStore();
const router = useRouter();

onMounted(() => {
  store.getExamsList();
});

const openTerm = (id: number) => {
  console.log(id);

  router.push({
    name: "my-result",
    params: {
      examId: id,
    },
  });
};
</script>

<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
    style="background-image: url(&quot;/src/assets/images/resBack.jpeg&quot;)"
    dir="rtl"
  >
    <div class="w-full max-w-6xl p-6">
      <h1 class="text-2xl flex justify-center items-center m-auto text-white font-bold mb-6">
        📚 اختر الترم
      </h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="exam in store.exams"
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

          <div class="mt-4 text-blue-600 font-semibold">اضغط لعرض النتائج →</div>
        </div>
      </div>
    </div>
  </div>
</template>
