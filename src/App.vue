<script setup lang="ts">
import NavBar from "./components/Common/NavBar.vue";
import Popup from "./components/Home Components/Popup.vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { sessionExpired } from "@/lib/globalState";

const showPopup = sessionExpired; // directly use it — no need for a separate ref

const goToHome = () => {
  sessionExpired.value = false;
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
    @close="sessionExpired = false"
    @action="goToHome"
  />
  <div dir="rtl" class="sticky text-xl top-0 z-50 shadow">
    <NavBar v-if="route.meta.showNav !== false" />
  </div>
  <RouterView />
</template>
