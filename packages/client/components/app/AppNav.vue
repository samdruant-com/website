<script setup lang="ts">
import { useNavigationStore } from "~/stores/navigation.store";
import { useSidebarStore } from "~/stores/sidebar.store";
import { useAuthStore } from "~/stores/auth.store";
import { usePortfolioStore } from "~/stores/portfolio.store";

const auth = useAuthStore();
const drawer = useSidebarStore();
const navigation = useNavigationStore();
const portfolioStore = usePortfolioStore();

</script>

<template>
  <div class="flex flex-row">
    <base-btn
      class="basis-1/4 grow-0 text-3xl mt-2 text-primary md:hidden"
      @click="drawer.toggle"
    >
      <span class="i-mdi-menu" />
    </base-btn>

    <router-link class="mr-auto" to="/">
      <p class="text-4xl md:text-3xl font-semibold">{{ portfolioStore.portfolio.name }}</p>
    </router-link>

    <nuxt-link v-for="option in navigation.options" :key="option.label" class="mr-3 hidden lg:block text-xl hover:underline"
      :to="option.to">
    {{ option.label }}
    </nuxt-link>

    <app-admin-menu v-if="auth.isAuthenticated" class="mr-2 hidden lg:block" />
  </div>
</template>
