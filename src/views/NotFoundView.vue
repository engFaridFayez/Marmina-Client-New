<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-8xl font-bold">404</h1>

      <h2 class="text-2xl font-bold mt-4">الصفحة غير موجودة</h2>

      <p class="text-gray-500 mt-2">الصفحة التي تبحث عنها غير موجودة.</p>

      <button class="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white" @click="$router.push('/')">
        العودة للرئيسية
      </button>
    </div>
  </div>
</template>
