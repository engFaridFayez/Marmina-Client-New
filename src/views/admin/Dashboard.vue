<script setup lang="ts">
const stats = [
  {
    title: "الأسر",
    value: "13",
    color: "from-[#232A7E] to-[#3a44a8]",
  },
  {
    title: "الخدام",
    value: "35",
    color: "from-[#D0A633] to-[#b88b22]",
  },
  {
    title: "المخدومين",
    value: "750",
    color: "from-green-500 to-green-700",
  },
  {
    title: "الحضور اليوم",
    value: "78%",
    color: "from-blue-500 to-blue-700",
  },
];
</script>

<template>
  <div class="flex h-screen bg-[#F9F5EF]" dir="rtl">
    <div class="flex-1 flex flex-col">

      <!-- Content -->
      <main class="p-6 space-y-6 overflow-y-auto">
        <!-- Welcome Card -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <h2 class="text-2xl font-bold text-[#232A7E]">👋 أهلاً بك في نظام الشمامسة</h2>
          <p class="text-gray-500 mt-2">متابعة الأسر، الخدام، والحضور من مكان واحد</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="p-6 rounded-2xl text-white shadow-lg bg-linear-to-r"
            :class="stat.color"
          >
            <p class="text-sm opacity-80">{{ stat.title }}</p>
            <h2 class="text-3xl font-bold mt-2">{{ stat.value }}</h2>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div class="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 class="font-bold text-[#232A7E] text-xl">إدارة الأسر</h3>
            <p class="text-gray-500 mt-2">عرض وتعديل الأسر والخدام</p>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 class="font-bold text-[#232A7E] text-xl">الحضور</h3>
            <p class="text-gray-500 mt-2">متابعة حضور الخدمة</p>
          </div>

          <div class="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
            <h3 class="font-bold text-[#232A7E] text-xl">التقارير</h3>
            <p class="text-gray-500 mt-2">إحصائيات وتحليلات</p>
          </div>
        </div>

        <!-- Fake Activity -->
        <div class="bg-white p-6 rounded-2xl shadow">
          <h3 class="text-xl font-bold text-[#232A7E] mb-4">آخر النشاطات</h3>

          <ul class="space-y-3 text-gray-600">
            <li>✔ تم إضافة أسرة جديدة</li>
            <li>✔ تم تحديث بيانات خادم</li>
            <li>✔ تسجيل حضور اليوم</li>
          </ul>
        </div>
      </main>
    </div>
  </div>
</template>
