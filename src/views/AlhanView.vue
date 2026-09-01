<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useDriveStore } from "@/stores/drive";
import { Pause, Play } from "lucide-vue-next";

const route = useRoute();
const driveStore = useDriveStore();

const familyId = Number(route.params.id);

const currentAudio = ref<HTMLAudioElement | null>(null);
const playingId = ref<string | null>(null);
const loadingAudio = ref<string | null>(null);

const progress = ref(0);
const duration = ref(0);

// =====================================================
// Folder Navigation
// =====================================================

const currentFolder = ref<any>(null);
const folderHistory = ref<any[]>([]);

const folders = computed(() => driveStore.driveItems);

const currentItems = computed(() => {
  if (!currentFolder.value) {
    return folders.value;
  }

  return currentFolder.value.children || [];
});

const folderItems = computed(() =>
  currentItems.value.filter((item: any) => item.type === "folder")
);

const audioItems = computed(() =>
  currentItems.value.filter((item: any) => item.type === "audio")
);

const openFolder = (folder: any) => {
  folderHistory.value.push(currentFolder.value);
  currentFolder.value = folder;

  stopAudio();
};

const back = () => {
  stopAudio();

  if (folderHistory.value.length > 0) {
    currentFolder.value = folderHistory.value.pop();
  } else {
    currentFolder.value = null;
  }
};

// =====================================================
// Audio
// =====================================================

const formatTime = (t: number) => {
  if (!t || !isFinite(t)) return "0:00";

  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);

  return `${m}:${s.toString().padStart(2, "0")}`;
};

const stopAudio = () => {
  if (currentAudio.value) {
    currentAudio.value.pause();
    currentAudio.value.currentTime = 0;
    currentAudio.value = null;
  }

  playingId.value = null;
  loadingAudio.value = null;
  progress.value = 0;
  duration.value = 0;
};

const playAudio = (id: string) => {
  // لو نفس الملف شغال
  if (playingId.value === id) {
    if (currentAudio.value?.paused) {
      currentAudio.value.play().catch(console.error);
    } else {
      currentAudio.value?.pause();
    }

    return;
  }

  // وقف أي ملف قديم
  stopAudio();

  loadingAudio.value = id;

  const audio = new Audio(`/api/drive/stream/${id}/`);

  audio.preload = "auto";

  audio.onloadedmetadata = () => {
    duration.value = audio.duration;
  };

  audio.oncanplay = () => {
    loadingAudio.value = null;
  };

  audio.ontimeupdate = () => {
    progress.value = audio.currentTime;
  };

  audio.onended = () => {
    playingId.value = null;
    loadingAudio.value = null;
    progress.value = 0;
  };

  audio.onerror = () => {
    loadingAudio.value = null;
    playingId.value = null;
  };

  currentAudio.value = audio;
  playingId.value = id;

  audio
    .play()
    .then(() => {
      loadingAudio.value = null;
    })
    .catch((err) => {
      loadingAudio.value = null;
      console.error(err);
    });
};

onMounted(() => {
  driveStore.getAlhan(familyId);
});

onUnmounted(() => {
  stopAudio();
});
</script>

<template>
  <div
    class="min-h-screen bg-[#0b0f14] text-white flex"
    dir="rtl"
  >
    <!-- Sidebar -->
    <aside
      class="w-72 bg-[#0f1720] border-r border-white/5 p-4 hidden md:block"
    >
      <h2 class="text-lg font-bold mb-4 text-white/90">
        📁 مكتبة الألحان
      </h2>

      <div class="space-y-2">
        <div
          v-for="folder in folders"
          :key="folder.id"
          @click="openFolder(folder)"
          class="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition hover:bg-white/5"
          :class="
            currentFolder?.id === folder.id
              ? 'bg-white/10'
              : ''
          "
        >
          <div class="text-xl">
            📂
          </div>

          <div class="text-sm font-medium">
            {{ folder.name }}
          </div>
        </div>
      </div>
    </aside>

    <!-- Main -->
    <main class="flex-1 p-6 pb-32">

      <!-- Empty -->
      <div
        v-if="!currentFolder"
        class="flex items-center justify-center h-full"
      >
        <div class="text-center opacity-70">
          <div class="text-5xl mb-4">
            🎧
          </div>

          <h2 class="text-xl font-bold">
            اختار ترم تبدأ تسمع
          </h2>

          <p class="text-sm text-white/50 mt-2">
            مكتبة الألحان
          </p>
        </div>
      </div>

      <!-- Folder -->
      <div v-else>

        <!-- Header -->
        <div class="flex items-center justify-between mb-6">

          <div>
            <h2 class="text-2xl font-bold">
              {{ currentFolder.name }}
            </h2>

            <p class="text-sm text-white/50">
              {{ currentItems.length }} عنصر
            </p>
          </div>

          <button
            @click="back"
            class="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            ⬅ رجوع
          </button>

        </div>

        <!-- Folders -->
        <div
          v-if="folderItems.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6"
        >
          <div
            v-for="folder in folderItems"
            :key="folder.id"
            @click="openFolder(folder)"
            class="flex items-center gap-4 p-4 rounded-xl bg-[#0f1720] border border-white/5 hover:bg-white/10 cursor-pointer transition"
          >
            <div class="text-3xl">
              📁
            </div>

            <div>
              <p class="font-semibold">
                {{ folder.name }}
              </p>

              <p class="text-xs text-white/40 mt-1">
                {{ folder.children?.length || 0 }} عنصر
              </p>
            </div>
          </div>
        </div>

        <!-- Audio -->
        <div class="space-y-2">

          <div
            v-for="item in audioItems"
            :key="item.id"
            @click="playAudio(item.id)"
            class="group flex items-center justify-between p-4 rounded-xl cursor-pointer transition"
            :class="
              playingId === item.id
                ? 'bg-green-500/20 border border-green-400/30'
                : 'hover:bg-white/5'
            "
          >

            <!-- Left -->
            <div class="flex items-center gap-4">

              <!-- Play -->
              <div
                class="w-11 h-11 flex items-center justify-center rounded-full transition"
                :class="
                  playingId === item.id
                    ? 'bg-green-500 text-black'
                    : 'bg-white/10 group-hover:bg-white/20'
                "
              >

                <!-- Loader -->
                <svg
                  v-if="loadingAudio === item.id"
                  class="animate-spin w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8z"
                  />
                </svg>

                <!-- Playing -->
                <span
                  v-else-if="playingId === item.id"
                >
                  ⏸
                </span>

                <!-- Idle -->
                <span v-else>
                  ▶
                </span>

              </div>

              <!-- Info -->
              <div>
                <p class="font-semibold">
                  {{ item.name }}
                </p>

                <p class="text-xs text-white/40">
                  Audio Track
                </p>
              </div>

            </div>

            <!-- Animation -->
            <div
              v-if="playingId === item.id"
              class="flex gap-1"
            >
              <span class="w-1.5 h-4 bg-green-400 animate-pulse"></span>
              <span class="w-1.5 h-6 bg-green-400 animate-pulse"></span>
              <span class="w-1.5 h-3 bg-green-400 animate-pulse"></span>
            </div>

          </div>

        </div>

        <!-- Empty folder -->
        <div
          v-if="!folderItems.length && !audioItems.length"
          class="text-center py-20 text-white/40"
        >
          📂 الفولدر فارغ
        </div>

      </div>

    </main>

    <!-- Mini Player -->
    <div
      v-if="playingId"
      class="fixed bottom-0 left-0 right-0 text-2xl bg-[#0f1720] border-t border-white/10 p-3 z-50"
    >

      <!-- Top -->
      <div class="flex items-center justify-between gap-4">

        <!-- Info -->
        <div class="flex items-center gap-3">

          <div
            class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
          >
            🎵
          </div>

          <div>
            <p class="text-lg font-semibold">
              Playing...
            </p>

            <p class="text-lg text-white/50">
              Audio Track
            </p>
          </div>

        </div>

        <!-- Time -->
        <div
          class="text-md text-white/60 whitespace-nowrap"
        >
          {{ formatTime(progress) }}
          /
          {{ formatTime(duration) }}
        </div>

        <!-- Button -->
        <button
          @click="
            currentAudio?.paused
              ? currentAudio.play()
              : currentAudio?.pause()
          "
          class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition"
        >
          <div class="flex items-center gap-2 text-sm font-semibold">

            <Pause
              v-if="!currentAudio?.paused"
              class="w-4 h-4 text-green-400"
            />

            <Play
              v-else
              class="w-4 h-4 text-yellow-400"
            />

          </div>
        </button>

      </div>

      <!-- Progress -->
      <div
        class="w-full mt-3 h-1 bg-white/10 rounded-full overflow-hidden"
      >
        <div
          class="h-full bg-green-500 transition-all duration-150"
          :style="{
            width: duration
              ? (progress / duration) * 100 + '%'
              : '0%'
          }"
        ></div>
      </div>

    </div>

  </div>
</template>
