<script setup lang="ts">
import { useGeneralStore } from "~/stores/app.store";

const generalStore = useGeneralStore();
const navigator = useNavigator();

function runEvent(event: { url?: string, action?: () => void }) {
  if (event.url) {
    navigator.openLink(event.url);
  } else if (event.action) {
    event.action();
  }

  generalStore.showsidebar = false;
}
</script>

<template>
  <div class="drawer">
    <input
      id="app-sidebar"
      v-model="generalStore.showsidebar"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content">
      <!-- Page content here -->
    </div>
    <div class="drawer-side">
      <label for="app-sidebar" aria-label="close sidebar" class="drawer-overlay" />

      <div class="w-full h-full flex flex-col bg-background relative">
        <button class="absolute top-4 right-4 p-4 text-6xl font-semibold" color="transparent" @click="generalStore.showsidebar = false">
          <span class="i-mdi-close" />
        </button>

        <div class="flex flex-col h-4/5 gap-4 items-center place-content-center">
          <div v-for="option in generalStore.pages" :key="option.label" class="text-4xl font-semibold first:mt-0 my-2">
            <button color="transparent" @click="runEvent({ url: option.to });">
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
