<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <div dir="rtl" class="sticky text-xl top-0 z-50 shadow">
    <NavBar />
  </div>

  <RouterView />
</template>
