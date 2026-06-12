<script setup lang="ts"></script>

<template>
  <div class="bg-[#F5EFE5] pb-10">
    <div class="flex justify-center pt-10 md:pt-16 text-center px-4">
      <h1 class="text-[#18294A] text-2xl md:text-4xl lg:text-5xl font-bold mx-2">جدول مواعيد</h1>
      <h1 class="text-[#D4AB34] text-2xl md:text-4xl lg:text-5xl font-bold">صفوف الشمامسة</h1>
    </div>
    <div class="flex justify-center mt-4">
      <div class="border-2 w-24 md:w-40 border-[#D4AB34] rounded-full mt-2"></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-5 px-4 lg:px-30">
      <div class="bg-white h-auto rounded-4xl p-5 px-6 w-full">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-[#18294A]">المرحلة الأولي</h1>
          </div>
          <div class="text-purple-700 bg-purple-300 p-2 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 80 80">
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M45.229 12.426a8.9 8.9 0 1 0-10.462 14.399A8.9 8.9 0 0 0 45.23 12.426M60.78 29.78a5 5 0 0 0-5.565-8.308l-9.911 6.64a3.2 3.2 0 0 1-1.794.545h-6.973c-.642 0-1.27-.19-1.805-.547l-9.96-6.643a5 5 0 1 0-5.549 8.319l9.57 6.383a.55.55 0 0 1 .244.457v6H51.01v-6c0-.188.093-.363.25-.468zM25.503 50.121l2.974-2.974c.342.804.86 1.533 1.526 2.128l4.288 3.827a6 6 0 0 0 1.427.946l-3.144 3.144l-.464.464a.72.72 0 0 0-.07.938l3.021 4.094a5 5 0 0 1-8.046 5.938L21.07 60.57a5 5 0 0 1 .488-6.505l3.481-3.481zm21.972 7.071l-3.161-3.16a6 6 0 0 0 1.391-.93l4.288-3.827a6 6 0 0 0 1.542-2.165l3.011 3.011l.453.453l3.513 3.47a5 5 0 0 1 .5 6.54l-5.989 8.056a5 5 0 0 1-8.025-5.966l3.032-4.08a.7.7 0 0 0-.07-.916l-.01-.011l-.011-.011z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <div class="border w-24 md:w-full border-[#c9c7c4] rounded-full"></div>
        </div>
        <div class="flex flex-col">
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعه 9:30 - 11:00</h5>
              <h5 class="text-[#ADAEA9]">كنيسة العدرا - مبني العدرا</h5>
            </div>
            <div class="text-end">
              <h1>اسرة القديس اسطفانوس (اولي ابتذائي)</h1>
              <h1 class="text-[#ADAEA9]">قداس الاطفال (7:00 - 9:00)</h1>
            </div>
          </div>
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعه 9:30 - 11:00</h5>
              <h5 class="text-[#ADAEA9]">كنيسة ابو سيفين - مبني العدرا</h5>
            </div>
            <div class="text-end">
              <h1>اسرة مارمينا (تانية ابتذائي)</h1>
              <h1 class="text-[#ADAEA9]">قداس الاطفال (7:00 - 9:00)</h1>
            </div>
          </div>
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعه 9:30 - 11:00</h5>
              <h5 class="text-[#ADAEA9]">الدور الثالث - مبني العدرا</h5>
            </div>
            <div class="text-end">
              <h1>اسرة الانبا بيشوي (تالتة ابتدائي)</h1>
              <h1 class="text-[#ADAEA9]">قداس الاطفال (7:00 - 9:00)</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-4xl p-5 px-6 w-full">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-[#18294A]">المرحلة الثانية</h1>
          </div>
          <div class="text-cyan-600 bg-cyan-200 p-2 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 640 512">
              <path
                fill="currentColor"
                d="M160 0a64 64 0 1 1 0 128a64 64 0 1 1 0-128M88 480v-80H70.2c-10.9 0-18.6-10.7-15.2-21.1l31.1-93.4l-28.6 37.8c-10.7 14.1-30.8 16.8-44.8 6.2s-16.8-30.7-6.2-44.8L65.4 207c22.4-29.6 57.5-47 94.6-47s72.2 17.4 94.6 47l58.9 77.7c10.7 14.1 7.9 34.2-6.2 44.8s-34.2 7.9-44.8-6.2l-28.6-37.8l31.1 93.4c3.5 10.4-4.3 21.1-15.2 21.1H232v80c0 17.7-14.3 32-32 32s-32-14.3-32-32v-80h-16v80c0 17.7-14.3 32-32 32s-32-14.3-32-32M480 0a64 64 0 1 1 0 128a64 64 0 1 1 0-128m-8 384v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V300.5L395.1 321c-9.4 15-29.2 19.4-44.1 10s-19.4-29.2-10-44.1l51.7-82.1c17.6-27.9 48.3-44.9 81.2-44.9h12.3c33 0 63.7 16.9 81.2 44.9l51.7 82.2c9.4 15 4.9 34.7-10 44.1s-34.7 4.9-44.1-10l-13-20.6V480c0 17.7-14.3 32-32 32s-32-14.3-32-32v-96z"
              />
            </svg>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <div class="border w-24 md:w-full border-[#c9c7c4] rounded-full"></div>
        </div>
        <div class="flex flex-col">
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعة 10:30 - 12:00</h5>
              <h5 class="text-[#ADAEA9]">الدور الرابع (مبني البابا كيرلس)</h5>
            </div>
            <div class="text-end">
              <h1>اسرة الانبا انطونيوس (رابعة)</h1>
              <h1 class="text-[#ADAEA9]">القداس الكبير (7:00 - 10:00)</h1>
            </div>
          </div>
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعة 10:30 - 12:00</h5>
              <h5 class="text-[#ADAEA9]">الدور الرابع (مبني البابا كيرلس)</h5>
            </div>
            <div class="text-end">
              <h1>اسرة البابا كيرلس عمود الدين (خامسة)</h1>
              <h1 class="text-[#ADAEA9]">القداس الكبير (7:00 - 10:00)</h1>
            </div>
          </div>
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">12:00 - 2:00</h5>
              <h5 class="text-[#ADAEA9]">الدور الرابع - مبني العدرا</h5>
            </div>
            <div class="text-end">
              <h1>اسرة البابا اثناسيوس (سادسه)</h1>
              <h1 class="text-[#ADAEA9]">القداس المتأخر (10:30 - 12:30)</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-4xl p-5 px-6 w-full">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-[#18294A]">المرحلة الثالثه (مرحلة اعدادي وثانوي)</h1>
          </div>
          <div class="text-red-700 bg-red-300 p-2 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M7.5 2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M6 7h3a2 2 0 0 1 2 2v5.5H9.5V22h-4v-7.5H4V9a2 2 0 0 1 2-2m10.5-5a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2M15 7h3a2 2 0 0 1 2 2v5.5h-1.5V22h-4v-7.5H13V9a2 2 0 0 1 2-2"
              />
            </svg>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <div class="border w-24 md:w-full border-[#c9c7c4] rounded-full"></div>
        </div>
        <div class="flex flex-col">
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعه 9:30 - 11:00</h5>
              <h5 class="text-[#ADAEA9]">كنيسة الانبا صموئيل - مبني البابا كيرلس</h5>
            </div>
            <div class="text-end">
              <h1>اسرة القديس اسطفانوس (اولي وتانيه ع - ث)</h1>
              <h1 class="text-[#ADAEA9]">قداس الاطفال 7:00 - 9:00</h1>
            </div>
          </div>
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعه 9:30 - 11:00</h5>
              <h5 class="text-[#ADAEA9]">الدور الثالث - المبني الرئيسي</h5>
            </div>
            <div class="text-end">
              <h1>اسرة الانبا بيشوي (تالته ع - ث)</h1>
              <h1 class="text-[#ADAEA9]">قداس الاطفال 7:00 - 9:00</h1>
            </div>
          </div>
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعه 9:00 - 10:30</h5>
              <h5 class="text-[#ADAEA9]">الدور الرابع - مبني البابا كيرلس</h5>
            </div>
            <div class="text-end">
              <h1>اسرة الانبا انطونيوس (رابعة ع - ث)</h1>
              <h1 class="text-[#ADAEA9]">القداس المتأخر (10:30 - 12:30)</h1>
            </div>
          </div>
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعه 9:00 - 10:30</h5>
              <h5 class="text-[#ADAEA9]">الدور الرابع - مبني البابا كيرلس</h5>
            </div>
            <div class="text-end">
              <h1>اسرة البابا كيرلس عمود الدين (خامسة ع - ث)</h1>
              <h1 class="text-[#ADAEA9]">القداس المتأخر (10:30 - 12:30)</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-4xl p-5 px-6 w-full">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-[#18294A]">أُسر خاصة</h1>
          </div>
          <div class="text-green-700 bg-green-300 p-2 rounded-2xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="m4.83 12.49l2.04 1.83l-.83 2.9l-1 3.5c-.12.4.03.84.37 1.08c.34.25.8.26 1.14.02l3-2L12 18.19l2.45 1.63l3 2a.99.99 0 0 0 1.14-.02c.34-.25.49-.68.37-1.08l-1-3.5l-.83-2.9l2.04-1.83l2.5-2.25c.3-.27.41-.69.28-1.06c-.13-.38-.47-.64-.87-.68l-3.15-.25l-2.56-.2l-2.47-5.46a.998.998 0 0 0-1.82 0L8.61 8.05l-2.56.2l-3.15.25c-.4.03-.74.3-.87.68s-.02.8.28 1.06l2.5 2.25Zm1.39-2.25l2.52-.2l.62-.05l.59-.05l.84-1.86l1.2-2.66l1.2 2.66l.84 1.86l.59.05l.62.05l2.52.2l.83.07l-.77.69l-2.5 2.25l-.46.42l.17.6l1.25 4.38l-3.74-2.49l-.55-.37l-.55.37l-3.74 2.49l1.25-4.38l.17-.6l-.46-.42L6.16 11l-.77-.69z"
              />
            </svg>
          </div>
        </div>
        <div class="flex justify-center mt-4">
          <div class="border w-24 md:w-full border-[#c9c7c4] rounded-full"></div>
        </div>
        <div class="flex flex-col">
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعه 12:00 - 2:00</h5>
              <h5 class="text-[#ADAEA9]">الدور الرابع (مبني البابا كيرلس)</h5>
            </div>
            <div class="text-end">
              <h1>الخورس (سابعه وثامنه)</h1>
              <h1 class="text-[#ADAEA9]">القداس المتأخر (10:30 - 12:30)</h1>
            </div>
          </div>
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الخميس 7:00 - 9:00</h5>
              <h5 class="text-[#ADAEA9]">كنيسة العدرا - مبني العدرا</h5>
            </div>
            <div class="text-end">
              <h1>أسرة حبيب جرجس</h1>
              <h1 class="text-[#ADAEA9]">القداس الكبير (7:00 - 10:00)</h1>
            </div>
          </div>
          <div class="bg-[#F5EFE5] flex justify-between items-start rounded-2xl mt-5 p-3">
            <div class="flex flex-col">
              <h5 class="text-[#D8AE41]">الجمعة 9:30 - 11:00</h5>
              <h5 class="text-[#ADAEA9]">الدور الرابع - مبني العدرا</h5>
            </div>
            <div class="text-end">
              <h1>الفصل التمهيدي</h1>
              <h1 class="text-[#ADAEA9]">لا يوجد</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
