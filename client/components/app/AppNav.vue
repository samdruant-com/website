<script setup lang="ts">
import { useNavigationStore } from '~/stores/navigation-store';
import { useSidebarStore } from '~/stores/sidebar-store';
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

const drawer = useSidebarStore();
const navigation = useNavigationStore();

const { name } = useDisplay();

const isSmallScreen = computed(() => {
  return name.value === 'xs' || name.value === 'sm';
});

</script>

<template>
  <v-app-bar
  id="app-nav"
  app
  flat
  color="transparent">
    <v-app-bar-nav-icon
      v-if="isSmallScreen"
      @click="drawer.toggle" />

    <router-link
      class="plain"
      to="/">
      <app-logo />
    </router-link>

    <v-spacer />

    <div v-if="!isSmallScreen" >
      <base-btn
        v-for="option in navigation.options"
        :key="option.label"
        class="mx-1"
        plain
        :color="option.color"
        :to="option.to"
        @click="option.action">
        {{ option.label }}
      </base-btn>
    </div>
  </v-app-bar>
</template>

<style scoped>
@media (min-width: 600px) {
  #app-nav {
    padding: 0 2rem;
  }
}
</style>