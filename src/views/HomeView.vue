<script setup lang="ts">
import NavBar from "@/components/NavBar.vue";
import Carousel from "@/components/Carousel.vue";
import About from "@/components/About.vue";
import Pops from "@/components/Pops.vue";
import Families from "@/components/Families.vue";
import Verse from "@/components/Verse.vue";
import TimeTable from "@/components/TimeTable.vue";
</script>

<template>
  <div dir="rtl">
    <NavBar />
  </div>
  <Carousel />
  <div dir="rtl">
    <About />
    <Pops />
    <Families />
    <Verse />
    <TimeTable />
  </div>

  <h1>HELLLLOOOOOOO</h1>
</template>
