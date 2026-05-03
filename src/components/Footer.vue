<script setup lang="ts"></script>

<template>
  <footer class="bg-[#18294C] text-white pt-10 pb-6">
    <div class="container mx-auto px-6">
      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- About -->
        <div>
          <div class="flex items-start gap-3 mb-4">
            <div class="bg-amber-400 rounded-full text-center">
              <svg
                class="text-[#182843]"
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m10 2l-.117.007A1 1 0 0 0 9 3v4H5a1 1 0 0 0-1 1v4l.007.117A1 1 0 0 0 5 13h4v8a1 1 0 0 0 1 1h4l.117-.007A1 1 0 0 0 15 21v-8h4a1 1 0 0 0 1-1V8l-.007-.117A1 1 0 0 0 19 7h-4V3a1 1 0 0 0-1-1z"
                />
              </svg>
            </div>
            <div>
              <h1 class="font-bold text-lg">مدرسة شمامسة</h1>
              <p class="text-sm text-gray-300">كنيسة الملاك سوريال ومارمينا</p>
            </div>
          </div>

          <p class="text-gray-300 leading-relaxed text-sm">
            مدرسة شمامسة كنيسة الملاك سوريال والشهيد العظيم مارمينا بالعمرانية هي منارة روحية تهدف
            إلى تعليم وخدمة أبناء الكنيسة بمحبة وإيمان.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h2 class="font-bold text-lg mb-4 text-center">روابط مهمة</h2>
          <ul class="space-y-2 text-gray-300 text-center">
            <li class="hover:text-[#D4AB34] cursor-pointer">الرئيسية</li>
            <li class="hover:text-[#D4AB34] cursor-pointer">عن المدرسة</li>
            <li class="hover:text-[#D4AB34] cursor-pointer">الجدول</li>
            <li class="hover:text-[#D4AB34] cursor-pointer">الأخبار</li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h2 class="font-bold text-lg mb-4 text-center">تواصل معنا</h2>
          <ul class="space-y-3 text-gray-300 text-sm text-center">
            <li>📍 العمرانية - الجيزة</li>
            <li>📞 01000000000</li>
            <li>✉️ info@church.com</li>
          </ul>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-600 my-6"></div>

      <!-- Bottom -->
      <div class="text-center text-gray-400 text-sm">
        © 2026 جميع الحقوق محفوظة - مدرسة الشمامسة
      </div>
    </div>
  </footer>
</template>
