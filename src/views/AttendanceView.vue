<script setup lang="ts">
import { useAttendanceStore } from "@/stores/attendance";
import { useAuthStore } from "@/stores/auth";
import { computed, onMounted } from "vue";
import { CalendarDays, Church, Users, BadgeCheck, BadgeX } from "lucide-vue-next";
import { useRoute } from "vue-router";
const route = useRoute();
const attendaceStore = useAttendanceStore();
const authStore = useAuthStore();
const TermName = computed(() => attendaceStore.attendances?.[0]?.term || "");
onMounted(async () => {
  const termId = Number(route.params.termId);
  await attendaceStore.GetAttendanceByTerm(termId);
});

const formatDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>

<template>
  <div
    class="min-h-screen bg-cover bg-center bg-no-repeat p-6"
    style="background-image: url(&quot;/src/assets/images/resBack.jpeg&quot;)"
    dir="rtl"
  >
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-8">
      <div class="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-extrabold text-white mb-2">
              {{ authStore.user?.full_name }}
            </h1>

            <p class="text-slate-300 text-lg">جدول حضورك القداسات و الاسر في {{ TermName }}</p>
          </div>

          <div class="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl px-6 py-4">
            <h2 class="text-cyan-400 text-sm mb-1">إجمالي الحضور</h2>

            <p class="text-white text-3xl font-bold">
              {{ attendaceStore.attendances.length }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div
      class="max-w-7xl mx-auto overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-2xl"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-right text-white">
          <!-- Header -->
          <thead class="bg-white/10 border-b border-white/10 text-slate-300">
            <tr>
              <th class="px-6 py-5 text-lg font-bold">التاريخ</th>

              <th class="px-6 py-5 text-lg font-bold">حضور القداس</th>

              <th class="px-6 py-5 text-lg font-bold">حضور الأسرة</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            <tr
              v-for="attendance in attendaceStore.attendances"
              :key="attendance.id"
              class="border-b border-white/5 hover:bg-white/5 transition duration-300"
            >
              <!-- Date -->
              <td class="px-6 py-5">
                <div class="flex items-center gap-3">
                  <div class="w-11 h-11 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <CalendarDays class="w-5 h-5 text-cyan-400" />
                  </div>

                  <span class="font-medium">
                    {{ formatDate(attendance.date) }}
                  </span>
                </div>
              </td>

              <!-- Mass -->
              <td class="px-6 py-5">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                    <Church class="w-5 h-5 text-cyan-400" />
                  </div>

                  <span
                    v-if="attendance.is_present_mass"
                    class="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold w-fit"
                  >
                    <BadgeCheck class="w-4 h-4" />
                    حاضر
                  </span>

                  <span
                    v-else
                    class="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold w-fit"
                  >
                    <BadgeX class="w-4 h-4" />
                    غائب
                  </span>
                </div>
              </td>

              <!-- Family -->
              <td class="px-6 py-5">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center"
                  >
                    <Users class="w-5 h-5 text-purple-400" />
                  </div>

                  <span
                    v-if="attendance.is_present_family"
                    class="flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold w-fit"
                  >
                    <BadgeCheck class="w-4 h-4" />
                    حاضر
                  </span>

                  <span
                    v-else
                    class="flex items-center gap-1 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-bold w-fit"
                  >
                    <BadgeX class="w-4 h-4" />
                    غائب
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="attendaceStore.attendances.length === 0" class="max-w-2xl mx-auto mt-20 text-center">
      <div class="bg-white/10 border border-white/10 rounded-3xl p-10 backdrop-blur-xl">
        <h2 class="text-3xl font-bold text-white mb-3">لا يوجد حضور حالياً</h2>

        <p class="text-slate-300">بمجرد تسجيل حضورك سيظهر هنا ✨</p>
      </div>
    </div>
  </div>
</template>
