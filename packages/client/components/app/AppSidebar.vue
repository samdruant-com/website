<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';
import { useNavigationStore } from '~/stores/navigation.store';
import { useSidebarStore } from '~/stores/sidebar.store';

const sidebarStore = useSidebarStore();
const navigationStore = useNavigationStore();
const authStore = useAuthStore();
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
  <base-sidebar id="app-sidebar" :visible="sidebarStore.visible" @close="sidebarStore.visible = false">
    <!-- tailwind list of centered links -->
    <div class="flex flex-col h-4/5 gap-4 items-center place-content-center">
      <div v-for="option in navigationStore.options" :key="option.label" class="text-4xl font-semibold first:mt-0 my-2">
        <span v-if="option.icon" :class="`i-{{ option.icon }}`" />

        <base-btn color="transparent" @click="runEvent({ action: option.action, url: option.to });">
          {{ option.label }}
        </base-btn>
      </div>

      <app-admin-menu v-if="authStore.isAuthenticated" :sidebar="true" class="text-4xl font-semibold" />
    </div>
  </base-sidebar>
</template>
