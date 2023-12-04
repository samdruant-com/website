<script setup lang="ts">
import { useNavigationStore } from "~/stores/navigation-store";
import { useSidebarStore } from "~/stores/sidebar-store";
import { useAuthStore } from "~/stores/auth-store";
import { usePortfolioStore } from "~/stores/portfolio-store";
import { useDisplay } from "vuetify";

const { smAndDown } = useDisplay();
const auth = useAuthStore();
const drawer = useSidebarStore();
const navigation = useNavigationStore();
const portfolioStore = usePortfolioStore();

const options = computed(() => {
  return smAndDown.value ? [] : navigation.options;
});

const logoClass = computed(() => {
  const base = "s-brand hide-link plain";
  
  return smAndDown.value ? base : `${base} ml-2`;
});

const logoStyle = computed<CSSStyleDeclaration>(() => {
  const style = {} as CSSStyleDeclaration;
  
  // center content on small screens
  if (smAndDown.value) {
    style.position = "absolute";
    style.left = "50%";
    style.transform = "translateX(-50%)";
  }
  
  return style;
});

</script>

<template>
  <v-app-bar app flat color="transparent" :style="{ padding: smAndDown ? 0 : '0 2rem'}">
    <v-app-bar-nav-icon v-if="smAndDown" @click="drawer.toggle" />

    <v-spacer v-if="smAndDown" />

    <router-link :class="logoClass" :style="logoStyle" to="/">
      <h2>{{ portfolioStore.portfolio.name }}</h2>
    </router-link>

    <v-spacer />

    <base-btn v-for="option in options" :key="option.label" class="mr-2 s-brand hide-link" plain
      :color="option.color" :to="option.to" @click="option.action">
      {{ option.label }}
    </base-btn>

    <app-admin-menu v-if="auth.isAuthenticated && !smAndDown" class="mr-2" />
  </v-app-bar>
</template>
