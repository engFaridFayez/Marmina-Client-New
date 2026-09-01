<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useResultStore } from "@/stores/results";
import { useAuthStore } from "@/stores/auth";
const resultStore = useResultStore();
const authStore = useAuthStore();

const role = computed(() => authStore.user?.role);

const isAdmin = computed(
  () => role.value === "admin" || role.value === "امين الشمامسة" || authStore.user?.is_staff,
);

const isStageSecretary = computed(() => role.value === "امين مرحلة");

const isFamilyUser = computed(
  () =>
    role.value === "خادم" || role.value === "امين اسرة" || role.value === "امين مساعد اسرة",
);

onMounted(async () => {
  if (isAdmin.value) {
    await Promise.all([resultStore.getSubjectsList(), resultStore.getExamsList()]);
  }
});

const stats = computed(() => [
  {
    title: "المواد",
    value: resultStore.subjects.length,
    icon: "📚",
    color: "from-[#232A7E] to-[#3a44a8]",
  },
  {
    title: "الامتحانات",
    value: resultStore.exams.length,
    icon: "📝",
    color: "from-[#D0A633] to-[#b88b22]",
  },
  {
    title: "المخدومين",
    value: resultStore.enrollments.length,
    icon: "👨‍🎓",
    color: "from-green-500 to-green-700",
  },
  {
    title: "النتائج",
    value: resultStore.enrollmentResults.length,
    icon: "📊",
    color: "from-blue-500 to-blue-700",
  },
]);
</script>

<template>
  <div class="flex h-screen bg-[#F9F5EF]" dir="rtl">
    <div class="flex-1 flex flex-col">
      <main class="p-6 space-y-6 overflow-y-auto">
        <!-- Welcome -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <h2 class="text-2xl font-bold text-[#232A7E]">👋 أهلاً بك في إدارة النتائج</h2>

          <p class="text-gray-500 mt-2">متابعة نتائج المخدومين والمواد والامتحانات من مكان واحد</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="p-6 rounded-2xl text-white shadow-lg bg-linear-to-r"
            :class="stat.color"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm opacity-80">
                  {{ stat.title }}
                </p>

                <h2 class="text-3xl font-bold mt-2">
                  {{ stat.value }}
                </h2>
              </div>

              <span class="text-4xl">
                {{ stat.icon }}
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-bold text-[#232A7E] mb-4">الوصول السريع</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <!-- نتائج الأسر -->
            <RouterLink
              v-if="isAdmin || isStageSecretary"
              to="/admin/results/families"
              class="bg-white p-5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div class="text-4xl mb-3">👨‍👩‍👧‍👦</div>

              <h3 class="font-bold text-[#232A7E] text-xl">نتائج الأسر</h3>

              <p class="text-gray-500 mt-2">عرض المخدومين وإدارة نتائج الأسر</p>
            </RouterLink>

            <!-- نتيجة أسرتي -->
            <RouterLink
              v-if="isFamilyUser"
              :to="`/admin/results/families/${authStore.user?.family?.id}`"
              class="bg-white p-5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div class="text-4xl mb-3">🏠</div>

              <h3 class="font-bold text-[#232A7E] text-xl">نتائج أسرتي</h3>

              <p class="text-gray-500 mt-2">عرض نتائج مخدومي الأسرة</p>
            </RouterLink>

            <!-- المواد -->
            <RouterLink
              v-if="isAdmin"
              to="/admin/results/subjects"
              class="bg-white p-5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div class="text-4xl mb-3">📚</div>

              <h3 class="font-bold text-[#232A7E] text-xl">المواد الدراسية</h3>

              <p class="text-gray-500 mt-2">عرض المواد ودرجات النجاح</p>
            </RouterLink>
            <RouterLink
              v-if="isAdmin"
              to="/admin/results/subject-exams"
              class="bg-white p-5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div class="text-4xl mb-3">📚</div>

              <h3 class="font-bold text-[#232A7E] text-xl">المواد الدراسية في كل ترم</h3>

              <p class="text-gray-500 mt-2">عرض المواد ودرجات النجاح في كل ترم</p>
            </RouterLink>

            <!-- الامتحانات -->
            <RouterLink
              v-if="isAdmin"
              to="/admin/results/exams"
              class="bg-white p-5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div class="text-4xl mb-3">📝</div>

              <h3 class="font-bold text-[#232A7E] text-xl">الامتحانات</h3>

              <p class="text-gray-500 mt-2">متابعة الامتحانات والسنوات الدراسية</p>
            </RouterLink>

            <!-- الترقية -->
            <RouterLink
              v-if="isAdmin || isStageSecretary || isFamilyUser"
              to="/admin/results/promotion"
              class="bg-white p-5 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition"
            >
              <div class="text-4xl mb-3">🚀</div>

              <h3 class="font-bold text-[#232A7E] text-xl">ترقية المخدومين</h3>

              <p class="text-gray-500 mt-2">نقل المخدومين إلى الأسرة التالية</p>
            </RouterLink>
          </div>
        </div>

        <!-- Subjects Preview -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h3 class="text-xl font-bold text-[#232A7E]">المواد الدراسية</h3>

              <p class="text-gray-500 text-sm mt-1">المواد المسجلة في النظام</p>
            </div>
          </div>

          <div v-if="resultStore.loading" class="text-center py-8 text-gray-400">
            جاري تحميل البيانات...
          </div>

          <div v-else-if="resultStore.subjects.length === 0" class="text-center py-8 text-gray-400">
            لا توجد مواد مسجلة حاليًا
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="subject in resultStore.subjects"
              :key="subject.id"
              class="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition"
            >
              <h4 class="font-bold text-gray-800">
                {{ subject.name }}
              </h4>

              <div class="flex justify-between mt-3 text-sm">
                <span class="text-gray-500"> الدرجة النهائية </span>

                <span class="font-bold text-[#232A7E]">
                  {{ subject.final_grade }}
                </span>
              </div>

              <div class="flex justify-between mt-2 text-sm">
                <span class="text-gray-500"> درجة النجاح </span>

                <span class="font-bold text-green-600">
                  {{ subject.success_grade }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Exams Preview -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <div class="flex items-center justify-between mb-5">
            <div>
              <h3 class="text-xl font-bold text-[#232A7E]">الامتحانات</h3>

              <p class="text-gray-500 text-sm mt-1">الامتحانات والسنوات الدراسية</p>
            </div>
          </div>

          <div v-if="resultStore.exams.length === 0" class="text-center py-8 text-gray-400">
            لا توجد امتحانات مسجلة حاليًا
          </div>

          <div v-else class="space-y-3">
            <div
              v-for="exam in resultStore.exams"
              :key="exam.id"
              class="flex items-center justify-between border border-gray-100 rounded-xl p-4"
            >
              <div>
                <h4 class="font-bold text-gray-800">
                  {{ exam.name }}
                </h4>

                <p class="text-sm text-gray-400 mt-1">السنة الدراسية: {{ exam.year }}</p>
              </div>

              <span class="px-3 py-1 rounded-full bg-[#F5F2E8] text-[#232A7E] text-sm font-bold">
                {{ exam.year }}
              </span>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div
          v-if="resultStore.error"
          class="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4"
        >
          {{ resultStore.error }}
        </div>
      </main>
    </div>
  </div>
</template>
