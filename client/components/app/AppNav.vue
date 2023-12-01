<script setup lang="ts">
import { useNavigationStore } from "~/stores/navigation-store";
import { useSidebarStore } from "~/stores/sidebar-store";
import { useAuthStore } from "~/stores/auth-store";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();
const auth = useAuthStore();
const drawer = useSidebarStore();
const navigation = useNavigationStore();

const options = computed(() => {
  return smAndDown.value ? [] : navigation.options;
});
</script>

<template>
  <v-app-bar id="app-nav" app flat color="transparent">
    <v-app-bar-nav-icon v-if="smAndDown" @click="drawer.toggle" />

    <router-link class="ml-2 s-brand hide-link plain" to="/">
      <h2>Sam Druant</h2>
    </router-link>

    <v-spacer />

    <base-btn v-for="option in navigation.options" :key="option.label" class="mr-2 s-brand hide-link" plain
      :color="option.color" :to="option.to" @click="option.action">
      {{ option.label }}
    </base-btn>

    <app-admin-menu v-if="auth.isAuthenticated" class="mr-2" />
  </v-app-bar>
</template>

<style scoped>
@media (min-width: 600px) {
  #app-nav {
    padding: 0 2rem;
  }
}
</style>
