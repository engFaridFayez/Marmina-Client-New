<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  content: String,
  button: String,
  type: {
    type: String,
    default: "info", // success | error | warning | info
  },
  buttonColor: String,
});

const emit = defineEmits(["close", "action"]);

const handleClose = () => {
  emit("close");
  window.location.reload();
};

const handleAction = () => {
  emit("action");
};

const styles = computed(() => {
  switch (props.type) {
    case "success":
      return "bg-green-500";
    case "error":
      return "bg-red-500";
    case "warning":
      return "bg-yellow-500";
    default:
      return "bg-indigo-500";
  }
});

const actionButtonStyles = computed(() => {
  switch (props.buttonColor) {
    case "ok":
      return "bg-green-500";
    case "delete":
      return "bg-red-500";
    case "login":
      return "bg-indigo-500";
    default:
      return "bg-black";
  }
});
</script>

<template>
  <!-- Overlay -->
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <!-- Popup -->
    <div class="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6 animate-fadeIn">
      <!-- Header -->
      <div class="flex items-start gap-4">
        <!-- Icon -->
        <div :class="styles" class="text-white p-2 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <!-- Text -->
        <div class="flex-1">
          <h2 class="text-lg font-semibold text-gray-800">
            {{ title }}
          </h2>
          <p class="text-sm text-gray-500 mt-1">
            {{ content }}
          </p>
        </div>

        <!-- Close -->
        <button @click="handleClose" class="text-gray-400 hover:text-gray-700 cursor-pointer">
          ✕
        </button>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="handleClose"
          class="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          Cancel
        </button>

        <button
          v-if="button"
          @click="handleAction"
          :class="[actionButtonStyles, 'px-4 py-2 text-sm rounded-lg text-white cursor-pointer']"
        >
          {{ button }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
</style>
