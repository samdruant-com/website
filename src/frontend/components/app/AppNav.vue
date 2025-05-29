<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useNavigationStore } from "~/stores/navigation.store";
import { usePortfolioStore } from "~/stores/portfolio.store";
import { useSidebarStore } from "~/stores/sidebar.store";

const auth = useAuthStore();
const drawer = useSidebarStore();
const navigation = useNavigationStore();
const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="flex flex-row md:mr-20">
    <base-btn class="basis-1/4 grow-0 text-3xl md:hidden" color="transparent" @click="drawer.toggle">
      <span class="i-mdi-menu" />
    </base-btn>

    <router-link class="basis-1/2 md:basis-1/4 mr-auto" to="/">
      <p class="text-3xl font-semibold text-center mt-2">
        {{ portfolioStore.portfolio.name }}
      </p>
    </router-link>

    <nuxt-link
      v-for="option in navigation.options"
      :key="option.label"
      class="mr-4 place-content-end hidden lg:block text-xl hover:underline"
      :to="option.to"
    >
      {{ option.label }}
    </nuxt-link>

    <app-admin-menu v-if="auth.isAuthenticated" class="mr-2 w-fit hidden lg:block" />
  </div>
</template>
