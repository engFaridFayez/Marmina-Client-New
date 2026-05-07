<script setup lang="ts">
import NavBar from "./components/NavBar.vue";
import Popup from "./components/Popup.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const showPopup = ref(false);

const handleUnauthorized = () => {
  showPopup.value = true;
};

onMounted(() => {
  window.addEventListener("unauthorized", handleUnauthorized);
});

onUnmounted(() => {
  window.removeEventListener("unauthorized", handleUnauthorized);
});

const goToHome = () => {
  window.location.href = "/";
};

const route = useRoute();
</script>

<template>
  <Popup
    v-if="showPopup"
    title="Session Expired"
    content="Please login again"
    button="Ok"
    type="error"
    @close="showPopup = false"
    @action="goToHome"
  />
  <div dir="rtl" class="sticky text-xl top-0 z-50 shadow">
    <NavBar v-if="route.meta.showNav !== false"/>
  </div>

  <RouterView />
</template>
