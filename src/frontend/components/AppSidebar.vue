<script setup lang="ts">
import { useNavigationStore } from "~/stores/navigation.store";
import { useSidebarStore } from "~/stores/sidebar.store";

const sidebarStore = useSidebarStore();
const navigationStore = useNavigationStore();
const navigator = useNavigator();

function runEvent(event: { url?: string, action?: () => void }) {
  if (event.url) {
    navigator.openLink(event.url);
  } else if (event.action) {
    event.action();
  }

  sidebarStore.visible = false;
}
</script>

<template>
  <div class="drawer">
    <input
      id="app-sidebar"
      v-model="sidebarStore.visible"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content">
      <!-- Page content here -->
    </div>
    <div class="drawer-side">
      <label for="app-sidebar" aria-label="close sidebar" class="drawer-overlay" />

      <div class="w-full h-full flex flex-col bg-background">
        <base-btn class="max-w-20 text-4xl font-semibold" color="transparent" @click="sidebarStore.visible = false">
          <span class="i-mdi-close" />
        </base-btn>

        <div class="flex flex-col h-4/5 gap-4 items-center place-content-center">
          <div v-for="option in navigationStore.options" :key="option.label" class="text-4xl font-semibold first:mt-0 my-2">
            <span v-if="option.icon" class="i-{{ option.icon }}" />

            <base-btn color="transparent" @click="runEvent({ action: option.action, url: option.to });">
              {{ option.label }}
            </base-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
