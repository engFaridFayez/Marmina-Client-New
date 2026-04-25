<script setup lang="ts">
import img from "@/assets/images/img.jpg";
</script>

<template>
  <div class="bg-[#F5EFE5] h-auto pb-20">
    <div class="flex justify-center pt-20">
      <h1 class="text-[#1B2947] text-2xl md:text-4xl lg:text-5xl">عن</h1>
      <h1 class="text-[#D4AB34] text-2xl md:text-4xl lg:text-5xl mx-3">مدرستنا</h1>
      <h1 class="text-[#1B2947] text-2xl md:text-4xl lg:text-5xl">المباركة</h1>
    </div>
    <div class="flex justify-center">
      <div class="border-4 mt-6 w-40 text-[#D4AB34] rounded-full"></div>
    </div>

    <div class="flex flex-col lg:flex-row items-center justify-evenly mt-20 gap-10 px-4">
      <div>
        <img
          :src="img"
          class="w-full max-w-[600px] h-[300px] md:h-[400px] lg:h-[450px] object-cover rounded-3xl"
        />
      </div>
      <div class="bg-white w-full max-w-[600px] h-auto rounded-3xl p-6">
        <h1 class="mt-5 mx-10 text-xl text-[#1B2947]">
          مدرسة شمامسة كنيسة الملاك سوريال والشهيد العظيم مارمينا بالعمرانية هي منارة روحية تخدم
          ابناء المنطقه منذ سنوات طويله. تسعي لتقديم تعليم روحي عميق وخدمة محبة لكل افراد المدرسة
        </h1>
        <h1 class="flex mt-5 mr-8">
          <div class="text-[#D4AB34]">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M4.5 2c-.277 0-.5.223-.5.5v9c0 .277.223.5.5.5h1c.277 0 .5-.223.5-.5v-9c0-.277-.223-.5-.5-.5zm3 1c-.277 0-.5.223-.5.5v8c0 .277.223.5.5.5h1c.277 0 .5-.223.5-.5v-8c0-.277-.223-.5-.5-.5zm3.549.99a.5.5 0 0 0-.102.018l-.965.258a.5.5 0 0 0-.353.613l1.81 6.762a.5.5 0 0 0 .614.353l.965-.26a.5.5 0 0 0 .353-.611l-1.81-6.762a.5.5 0 0 0-.512-.37M1.5 4c-.277 0-.5.223-.5.5v7c0 .277.223.5.5.5h1c.277 0 .5-.223.5-.5v-7c0-.277-.223-.5-.5-.5zm0 9a.499.499 0 1 0 0 1h12a.499.499 0 1 0 0-1z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-xl mr-3 mt-2 font-bold text-[#1B2947]">دراسات روحيه متنوعة</h1>
          </div>
        </h1>
        <h1 class="flex mt-4 mr-8">
          <div class="text-[#D4AB34]">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
              <g fill="none">
                <path
                  d="M13.622 2.303a1.65 1.65 0 0 1 1.649 1.307l2.218 10.385l1.715 1.715l-4.115 4.116l-2.235-2.235a2.9 2.9 0 0 1-.852-2.041h-.006a2.9 2.9 0 0 1-.852 2.041l-2.235 2.235l-4.115-4.116l1.715-1.715L8.728 3.61a1.653 1.653 0 0 1 3.268.34h.006a1.653 1.653 0 0 1 1.62-1.647"
                />
                <path
                  d="m19.204 15.71l-4.116 4.116l2.058 2.057l4.116-4.115zm-14.41 0l4.116 4.116l-2.058 2.057l-4.116-4.115z"
                />
                <path
                  stroke="currentColor"
                  stroke-linecap="square"
                  stroke-width="2"
                  d="m19.204 15.71l-1.715-1.715L15.27 3.61a1.653 1.653 0 0 0-3.268.345v11.579c0 .771.307 1.512.852 2.057l2.235 2.235m4.115-4.116l-4.115 4.116m4.115-4.116l2.058 2.058l-4.116 4.115l-2.057-2.057M4.794 15.71l1.715-1.715L8.728 3.61a1.653 1.653 0 0 1 3.268.345v11.579a2.9 2.9 0 0 1-.852 2.057L8.91 19.826M4.794 15.71l4.116 4.116M4.794 15.71l-2.058 2.058l4.116 4.115l2.058-2.057"
                />
              </g>
            </svg>
          </div>
          <div>
            <h1 class="text-xl mr-3 mt-2 font-bold text-[#1B2947]">حياة صلاه وشركه مقدسه</h1>
          </div>
        </h1>
        <h1 class="flex mt-5 mr-8">
          <div class="text-[#D4AB34]">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 16 16">
              <path
                fill="currentColor"
                d="M9.5 7.5a1.5 1.5 0 1 1-3.001-.001A1.5 1.5 0 0 1 9.5 7.5M14.27 4h-2.54A1.73 1.73 0 0 0 10 5.73V9a1 1 0 0 0 1 1v6h4v-6a1 1 0 0 0 1-1V5.73A1.73 1.73 0 0 0 14.27 4"
              />
              <path
                fill="currentColor"
                d="M15 2a2 2 0 1 1-3.999.001A2 2 0 0 1 15 2M4.27 5H1.73a1.73 1.73 0 1 0 .001 3.461A1.73 1.73 0 0 0 1.73 5A1.73 1.73 0 0 0 0 6.73V9a1 1 0 0 0 1 1l-1 3h1v3h4v-3h1l-1-3a1 1 0 0 0 1-1V6.73A1.73 1.73 0 0 0 4.27 5"
              />
              <path
                fill="currentColor"
                d="M5 3a2 2 0 1 1-3.999.001A2 2 0 0 1 5 3m2 10v3h2v-3a1 1 0 0 0 1-1v-1.54A1.46 1.46 0 0 0 8.54 9H7.46A1.46 1.46 0 0 0 6 10.46V12a1 1 0 0 0 1 1"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-xl mr-3 mt-2 font-bold text-[#1B2947]">أُسر شمامسة لجميع الاعمار</h1>
          </div>
        </h1>
        <h1 class="flex mt-5 mr-8">
          <div class="text-[#D4AB34]">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32">
              <path
                fill="currentColor"
                d="M28.95 27.43H32v1.52h-3.05Zm-1.53 1.52h1.53v1.53h-1.53Zm0-21.33h1.53v13.71h-1.53ZM25.9 21.33h1.52v3.05H25.9Zm0-16.76h1.52v3.05H25.9Zm-1.52 25.91h3.04V32h-3.04Zm0-6.1h1.52v1.52h-1.52Zm0-21.33h1.52v1.52h-1.52Zm0 22.85h-3.05v1.53h1.52v3.05h1.53zm-1.53-4.57h1.53v-3.04h-1.53v-1.53H19.8v1.53h-1.52v3.04h1.52v1.53h3.05zM21.33 1.52h3.05v1.53h-3.05ZM19.8 12.19h3.05v-1.52h1.53V7.62h-1.53V6.1H19.8v1.52h-1.52v3.05h1.52z"
              />
              <path
                fill="currentColor"
                d="M7.61 27.43h13.72v1.52H7.61Zm4.58-15.24h4.57v4.57h-4.57ZM7.61 0h13.72v1.52H7.61Zm1.53 16.76H6.09v1.53H4.57v3.04h1.52v1.53h3.05v-1.53h1.52v-3.04H9.14zm0-10.66H6.09v1.52H4.57v3.05h1.52v1.52h3.05v-1.52h1.52V7.62H9.14zM4.57 25.9h3.04v1.53H4.57Zm0-24.38h3.04v1.53H4.57ZM3.04 24.38h1.53v1.52H3.04Zm0-21.33h1.53v1.52H3.04ZM1.52 21.33h1.52v3.05H1.52Zm0-16.76h1.52v3.05H1.52ZM0 7.62h1.52v13.71H0Z"
              />
            </svg>
          </div>
          <div>
            <h1 class="text-xl mr-3 mt-2 font-bold text-[#1B2947]">ترفية ومتعة في تعلم المناهج المختلفة</h1>
          </div>
        </h1>
      </div>
    </div>
  </div>
</template>
