<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";

const route = useRoute();
const router = useRouter();

const resultStore = useResultStore();

const familyId = Number(route.params.familyId);

onMounted(async () => {
  await resultStore.getFamilyStudents(familyId);
});

const goBack = () => {
  router.push("/dashboard/results/families");
};

const openStudentResults = (studentId: number) => {
  router.push(`/admin/results/students/${studentId}/enrollments`);
};
</script>

<template>
  <div dir="rtl" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-3">
          <button
            @click="goBack"
            class="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition flex items-center justify-center"
          >
            ←
          </button>

          <div>
            <h1 class="text-2xl font-bold text-[#232A7E]">
              {{ resultStore.familyData?.family.name || "الأسرة" }}
            </h1>

            <p class="text-gray-500 mt-1">عرض مخدومي الأسرة ونتائجهم الدراسية</p>
          </div>
        </div>
      </div>

      <!-- Family Info -->
      <div v-if="resultStore.familyData?.family" class="hidden md:flex items-center gap-3">
        <div class="px-4 py-2 rounded-xl bg-[#F5F2E8] text-[#232A7E] text-sm font-bold">
          {{ resultStore.familyData.family.year }}
        </div>

        <div
          v-if="resultStore.familyData.family.stage"
          class="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 text-sm font-bold"
        >
          {{ resultStore.familyData.family.stage }}
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="resultStore.loading"
      class="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center"
    >
      <div class="text-4xl mb-4">⏳</div>

      <p class="text-gray-400">جاري تحميل المخدومين...</p>
    </div>

    <!-- Error -->
    <div
      v-else-if="resultStore.error"
      class="bg-red-50 border border-red-200 text-red-600 rounded-2xl p-5"
    >
      <div class="flex items-center gap-3">
        <span class="text-xl"> ⚠️ </span>

        <span>
          {{ resultStore.error }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <template v-else-if="resultStore.familyData">
      <!-- Family Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Family -->
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-[#232A7E] text-white flex items-center justify-center text-xl"
            >
              👨‍👩‍👧‍👦
            </div>

            <div>
              <p class="text-sm text-gray-400">الأسرة</p>

              <h3 class="font-bold text-gray-800 mt-1">
                {{ resultStore.familyData.family.name }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Stage -->
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl"
            >
              🎯
            </div>

            <div>
              <p class="text-sm text-gray-400">المرحلة</p>

              <h3 class="font-bold text-gray-800 mt-1">
                {{ resultStore.familyData.family.stage || "غير محددة" }}
              </h3>
            </div>
          </div>
        </div>

        <!-- Students Count -->
        <div class="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center text-xl"
            >
              👨‍🎓
            </div>

            <div>
              <p class="text-sm text-gray-400">عدد المخدومين</p>

              <h3 class="font-bold text-gray-800 mt-1">
                {{ resultStore.familyData.students.length }}
              </h3>
            </div>
          </div>
        </div>
      </div>

      <!-- Students -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-[#232A7E]">المخدومين</h2>

            <p class="text-sm text-gray-400 mt-1">اختر مخدومًا لعرض سجله الدراسي</p>
          </div>

          <span class="px-4 py-2 rounded-xl bg-[#F5F2E8] text-[#232A7E] font-bold text-sm">
            {{ resultStore.familyData.students.length }}
            مخدوم
          </span>
        </div>

        <!-- Empty -->
        <div v-if="resultStore.familyData.students.length === 0" class="py-12 text-center">
          <div class="text-5xl mb-4">👨‍🎓</div>

          <p class="text-gray-400">لا يوجد مخدومين في هذه الأسرة حاليًا</p>
        </div>

        <!-- Students Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            v-for="student in resultStore.familyData.students"
            :key="student.id"
            @click="openStudentResults(student.id)"
            class="group text-right border border-gray-100 rounded-2xl p-4 hover:border-[#232A7E]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white"
          >
            <div class="flex items-center gap-4">
              <!-- Image -->
              <img
                v-if="student.image"
                :src="student.image"
                :alt="student.full_name"
                class="w-16 h-16 rounded-2xl object-cover"
              />

              <div
                v-else
                class="w-16 h-16 rounded-2xl bg-[#F5F2E8] text-[#232A7E] flex items-center justify-center text-2xl"
              >
                👤
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-gray-800 truncate group-hover:text-[#232A7E] transition">
                  {{ student.full_name }}
                </h3>

                <p class="text-sm text-gray-400 mt-1">عرض النتائج</p>
              </div>

              <!-- Arrow -->
              <span
                class="text-gray-300 group-hover:text-[#232A7E] group-hover:-translate-x-1 transition"
              >
                ←
              </span>
            </div>
          </button>
        </div>
      </div>
    </template>
  </div>
</template>
