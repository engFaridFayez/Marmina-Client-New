<script setup lang="ts"></script>

<template>
  <div class="bg-white">
    <div class="flex justify-center pt-20">
      <h1 class="text-[#18294A] text-2xl font-bold md:text-4xl lg:text-5xl mx-3">إشعارات</h1>
      <h1 class="text-[#D4AB34] text-2xl font-bold md:text-4xl lg:text-5xl">هامة</h1>
    </div>
    <div class="flex justify-center">
      <div class="border-4 mt-6 w-40 text-[#D4AB34] rounded-full"></div>
    </div>

    <div class="flex flex-col justify-center items-center mt-15">
      <div
        class="bg-red-200 flex w-[90%] md:w-[80%] lg:w-[50%] justify-between p-5 rounded-3xl shadow-[5px_0_5px_2px] shadow-red-300 mb-10"
      >
        <div class="flex">
          <div class="text-red-500 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
              <defs>
                <mask id="SVGG1he6d3K">
                  <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path
                      fill="#fff"
                      fill-opacity="0"
                      stroke="#fff"
                      stroke-dasharray="54"
                      d="M12 4c4.42 0 8 3.58 8 8c0 4.42 -3.58 8 -8 8c-4.42 0 -8 -3.58 -8 -8c0 -4.42 3.58 -8 8 -8"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.6s"
                        values="54;0"
                      />
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="1.3s"
                        dur="0.4s"
                        to="1"
                      />
                    </path>
                    <g fill="none" stroke="#000">
                      <path stroke-dasharray="6" stroke-dashoffset="6" d="M12 8v4">
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="1.8s"
                          dur="0.2s"
                          to="0"
                        />
                      </path>
                      <path stroke-dasharray="4" stroke-dashoffset="4" d="M12 16v0.01">
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="2s"
                          dur="0.2s"
                          to="0"
                        />
                      </path>
                    </g>
                  </g>
                </mask>
              </defs>
              <path fill="currentColor" d="M0 0h24v24H0z" mask="url(#SVGG1he6d3K)" />
              <g
                fill="none"
                stroke="currentColor"
                stroke-dasharray="20"
                stroke-dashoffset="20"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M4.22 4.22c-4.29 4.3 -4.29 11.26 0 15.56">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.7s"
                    dur="0.3s"
                    to="0"
                  />
                </path>
                <path d="M19.78 4.22c4.29 4.3 4.29 11.26 0 15.56">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1s"
                    dur="0.3s"
                    to="0"
                  />
                </path>
              </g>
            </svg>
          </div>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold text-red-600">تنبية عاجل</h1>
            <h1 class="text-2xl text-red-500">تم تغيير موعد اجتماع الشمامسة العام</h1>
          </div>
        </div>
        <div>
          <h1 class="text-2xl text-red-400 text-end">منذ ساعتين</h1>
        </div>
      </div>
      <div
        class="bg-yellow-100 flex w-[90%] md:w-[80%] lg:w-[50%] justify-between p-5 rounded-3xl shadow-[5px_0_5px_2px] shadow-yellow-300 mb-10"
      >
        <div class="flex">
          <div class="text-yellow-500 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
              <g
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path
                  fill="currentColor"
                  fill-opacity="0"
                  stroke-dasharray="60"
                  d="M12 3l9 17h-18l9 -17Z"
                >
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    dur="0.6s"
                    values="60;0"
                  />
                  <animate
                    fill="freeze"
                    attributeName="fill-opacity"
                    begin="1s"
                    dur="0.15s"
                    to="0.3"
                  />
                </path>
                <g fill="none">
                  <path stroke-dasharray="6" stroke-dashoffset="6" d="M12 10v4">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.7s"
                      dur="0.2s"
                      to="0"
                    />
                  </path>
                  <path stroke-dasharray="4" stroke-dashoffset="4" d="M12 17v0.01">
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.7s"
                      dur="0.2s"
                      to="0"
                    />
                  </path>
                </g>
              </g>
            </svg>
          </div>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold text-yellow-700">تذكير مهم</h1>
            <h1 class="text-2xl text-yellow-600">ميعاد مؤتمر الشمامسة اول اسبوع في شهر 9</h1>
          </div>
        </div>
        <div>
          <h1 class="text-2xl text-yellow-500 text-end">منذ 5 ساعات</h1>
        </div>
      </div>
      <div
        class="bg-blue-200 flex w-[90%] md:w-[80%] lg:w-[50%] justify-between p-5 rounded-3xl shadow-[5px_0_5px_2px] shadow-blue-300 mb-10"
      >
        <div class="flex">
          <div class="text-blue-500 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
              <defs>
                <mask id="SVGG1he6d3K">
                  <g stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                    <path
                      fill="#fff"
                      fill-opacity="0"
                      stroke="#fff"
                      stroke-dasharray="54"
                      d="M12 4c4.42 0 8 3.58 8 8c0 4.42 -3.58 8 -8 8c-4.42 0 -8 -3.58 -8 -8c0 -4.42 3.58 -8 8 -8"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.6s"
                        values="54;0"
                      />
                      <animate
                        fill="freeze"
                        attributeName="fill-opacity"
                        begin="1.3s"
                        dur="0.4s"
                        to="1"
                      />
                    </path>
                    <g fill="none" stroke="#000">
                      <path stroke-dasharray="6" stroke-dashoffset="6" d="M12 8v4">
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="1.8s"
                          dur="0.2s"
                          to="0"
                        />
                      </path>
                      <path stroke-dasharray="4" stroke-dashoffset="4" d="M12 16v0.01">
                        <animate
                          fill="freeze"
                          attributeName="stroke-dashoffset"
                          begin="2s"
                          dur="0.2s"
                          to="0"
                        />
                      </path>
                    </g>
                  </g>
                </mask>
              </defs>
              <path fill="currentColor" d="M0 0h24v24H0z" mask="url(#SVGG1he6d3K)" />
              <g
                fill="none"
                stroke="currentColor"
                stroke-dasharray="20"
                stroke-dashoffset="20"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <path d="M4.22 4.22c-4.29 4.3 -4.29 11.26 0 15.56">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="0.7s"
                    dur="0.3s"
                    to="0"
                  />
                </path>
                <path d="M19.78 4.22c4.29 4.3 4.29 11.26 0 15.56">
                  <animate
                    fill="freeze"
                    attributeName="stroke-dashoffset"
                    begin="1s"
                    dur="0.3s"
                    to="0"
                  />
                </path>
              </g>
            </svg>
          </div>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold text-blue-600">اعلان هام</h1>
            <h1 class="text-2xl text-blue-500">
              تم اضافة الحان مناسبة اسبوع الالام في مكتبة الالحان في الصفحه
            </h1>
          </div>
        </div>
        <div>
          <h1 class="text-2xl text-blue-400 text-end">امس</h1>
        </div>
      </div>
      <div
        class="bg-green-200 flex w-[90%] md:w-[80%] lg:w-[50%] justify-between p-5 rounded-3xl shadow-[5px_0_5px_2px] shadow-green-300 mb-30"
      >
        <div class="flex">
          <div class="text-green-500 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24">
              <defs>
                <mask id="SVG9LXuEA4n">
                  <g
                    fill="none"
                    stroke-dasharray="24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="#fff" stroke-width="2" d="M2 13.5l4 4l10.75 -10.75">
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        dur="0.5s"
                        values="24;0"
                      />
                    </path>
                    <path
                      stroke="#000"
                      stroke-dashoffset="24"
                      stroke-width="6"
                      d="M7.5 13.5l4 4l10.75 -10.75"
                    >
                      <animate
                        fill="freeze"
                        attributeName="stroke-dashoffset"
                        begin="0.5s"
                        dur="0.3s"
                        to="0"
                      />
                    </path>
                  </g>
                </mask>
              </defs>
              <path fill="currentColor" d="M0 0h24v24H0z" mask="url(#SVG9LXuEA4n)" />
              <path
                fill="none"
                stroke="currentColor"
                stroke-dasharray="24"
                stroke-dashoffset="24"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7.5 13.5l4 4l10.75 -10.75"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.5s"
                  dur="0.3s"
                  to="0"
                />
              </path>
            </svg>
          </div>
          <div class="flex flex-col">
            <h1 class="text-3xl font-bold text-green-600">تأكيد حضور</h1>
            <h1 class="text-2xl text-green-500">تم تأكيد حضورك في اجتماع الشمامسة الجمعه السابقه</h1>
          </div>
        </div>
        <div>
          <h1 class="text-2xl text-green-400 text-end">منذ يومين</h1>
        </div>
      </div>
    </div>
  </div>
</template>
