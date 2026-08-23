<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useResultStore } from "@/stores/results";

const resultStore = useResultStore();

const selectedFamilyId = ref<number | null>(null);
const passedStudentIds = ref<number[]>([]);
const failedStudentIds = ref<number[]>([]);
const promoting = ref(false);
const successMessage = ref("");

onMounted(async () => {
  await resultStore.getResultFamilies();
});

const currentFamilyStudents = computed(() => resultStore.familyData?.students ?? []);

const onFamilySelect = async (familyId: number) => {
  selectedFamilyId.value = familyId;
  passedStudentIds.value = [];
  failedStudentIds.value = [];
  await resultStore.getFamilyStudents(familyId);
};

const setStatus = (studentId: number, status: "passed" | "failed" | "none") => {
  passedStudentIds.value = passedStudentIds.value.filter((id) => id !== studentId);
  failedStudentIds.value = failedStudentIds.value.filter((id) => id !== studentId);

  if (status === "passed") passedStudentIds.value.push(studentId);
  if (status === "failed") failedStudentIds.value.push(studentId);
};

const statusOf = (studentId: number) => {
  if (passedStudentIds.value.includes(studentId)) return "passed";
  if (failedStudentIds.value.includes(studentId)) return "failed";
  return "none";
};

const markAllPassed = () => {
  passedStudentIds.value = currentFamilyStudents.value.map((s) => s.id);
  failedStudentIds.value = [];
};

const clearSelection = () => {
  passedStudentIds.value = [];
  failedStudentIds.value = [];
};

const promoteStudents = async () => {
  if (!selectedFamilyId.value) return;
  if (!passedStudentIds.value.length && !failedStudentIds.value.length) return;

  promoting.value = true;
  successMessage.value = "";

  try {
    await resultStore.promoteStudents(
      selectedFamilyId.value,
      passedStudentIds.value,
      failedStudentIds.value,
    );
    successMessage.value = "تمت ترقية الطلاب بنجاح";
    passedStudentIds.value = [];
    failedStudentIds.value = [];
    await resultStore.getFamilyStudents(selectedFamilyId.value);
  } finally {
    promoting.value = false;
  }
};

const selectPassedStudents = () => {
  passedStudentIds.value = currentFamilyStudents.value
    .filter((student) => student.status === "ناجح")
    .map((student) => student.id);

  failedStudentIds.value = currentFamilyStudents.value
    .filter((student) => student.status === "راسب")
    .map((student) => student.id);
};
</script>

<template>
  <div dir="rtl" class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-[#232A7E]">ترقية الطلاب</h1>
      <p class="text-gray-500 mt-2">نقل الطلاب إلى الأسرة التالية</p>
    </div>

    <!-- Success -->
    <div
      v-if="successMessage"
      class="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4"
    >
      {{ successMessage }}
    </div>

    <!-- Family Picker -->
    <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 class="font-bold text-[#232A7E] mb-4">اختر الأسرة</h3>

      <div v-if="resultStore.loading" class="text-center py-6 text-gray-400">جاري التحميل...</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          v-for="family in resultStore.resultFamilies"
          :key="family.id"
          @click="onFamilySelect(family.id)"
          class="text-right border rounded-xl p-4 transition"
          :class="
            selectedFamilyId === family.id
              ? 'border-[#232A7E] bg-[#F5F2E8]'
              : 'border-gray-100 hover:shadow-sm'
          "
        >
          <h4 class="font-bold text-gray-800">{{ family.name }}</h4>
          <p class="text-sm text-gray-400 mt-1">{{ family.stage || "غير محددة" }}</p>
        </button>
      </div>
    </div>

    <!-- Students -->
    <div v-if="selectedFamilyId" class="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div class="flex items-center justify-between mb-5">
        <div>
          <h3 class="font-bold text-[#232A7E]">حدد حالة كل مخدوم</h3>
          <p class="text-sm text-gray-400 mt-1">
            ناجح ← ترقية للأسرة التالية · راسب ← بقاء بنفس المرحلة
          </p>
        </div>

        <div class="flex gap-2">
          <button
            @click="selectPassedStudents"
            class="px-3 py-1.5 rounded-lg bg-[#F5F2E8] text-[#232A7E] text-sm font-bold hover:bg-[#eee7d8] transition"
          >
            تحديد حسب النتيجة
          </button>

          <button
            @click="clearSelection"
            class="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm font-bold hover:bg-gray-200 transition"
          >
            إلغاء التحديد
          </button>
        </div>
      </div>

      <div v-if="currentFamilyStudents.length === 0" class="text-center py-8 text-gray-400">
        لا يوجد مخدومين في هذه الأسرة
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="student in currentFamilyStudents"
          :key="student.id"
          class="border rounded-xl p-4 transition"
          :class="
            statusOf(student.id) === 'passed'
              ? 'border-green-300 bg-green-50'
              : statusOf(student.id) === 'failed'
                ? 'border-red-300 bg-red-50'
                : 'border-gray-100'
          "
        >
          <div class="flex items-center justify-between gap-2">
            <span class="font-semibold text-gray-800">
              {{ student.full_name }}
            </span>

            <!-- ناجح -->
            <span
              v-if="student.status === 'ناجح'"
              class="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700"
            >
              ناجح
            </span>

            <!-- راسب -->
            <span
              v-else-if="student.status === 'راسب'"
              class="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"
            >
              راسب
            </span>

            <!-- لم تحدد النتيجة -->
            <span
              v-else
              class="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500"
            >
              لم تحدد
            </span>
          </div>

          <div class="flex gap-2 mt-3">
            <button
              @click="setStatus(student.id, 'passed')"
              class="flex-1 py-1.5 rounded-lg text-xs font-bold transition"
              :class="
                statusOf(student.id) === 'passed'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-green-300'
              "
            >
              ناجح
            </button>

            <button
              @click="setStatus(student.id, 'failed')"
              class="flex-1 py-1.5 rounded-lg text-xs font-bold transition"
              :class="
                statusOf(student.id) === 'failed'
                  ? 'bg-red-500 text-white'
                  : 'bg-white border border-gray-200 text-gray-500 hover:border-red-300'
              "
            >
              راسب
            </button>

            <button
              @click="setStatus(student.id, 'none')"
              class="px-2 py-1.5 rounded-lg text-xs font-bold bg-white border border-gray-200 text-gray-400 hover:border-gray-300 transition"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-between">
        <p class="text-sm text-gray-400">
          ناجح: {{ passedStudentIds.length }} · راسب: {{ failedStudentIds.length }}
        </p>

        <button
          @click="promoteStudents"
          :disabled="(!passedStudentIds.length && !failedStudentIds.length) || promoting"
          class="px-6 py-3 rounded-xl bg-[#232A7E] text-white font-bold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1b2263] transition"
        >
          {{ promoting ? "جاري الترقية..." : "تأكيد الترقية" }}
        </button>
      </div>
    </div>
  </div>
</template>
