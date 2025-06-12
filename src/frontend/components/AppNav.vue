<script setup lang="ts">
import { useNavigationStore } from "~/stores/navigation.store";
import { usePortfolioStore } from "~/stores/portfolio.store";
import { useSidebarStore } from "~/stores/sidebar.store";

const drawer = useSidebarStore();
const navigation = useNavigationStore();
const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="flex flex-row items-center md:mr-20">
    <button class="basis-1/4 grow-0 ml-2 p-2 flex items-center text-3xl md:hidden" color="transparent" @click="drawer.toggle">
      <span class="i-mdi-menu" />
    </button>

    <router-link class="basis-1/2 md:basis-1/4 mr-auto flex items-center justify-center text-3xl font-semibold text-center mt-0" to="/">
      {{ portfolioStore.getPortfolio.name }}
    </router-link>

    <nuxt-link
      v-for="option in navigation.options"
      :key="option.label"
      class="mr-4 place-content-end hidden lg:block text-xl hover:underline"
      :to="option.to"
    >
      {{ option.label }}
    </nuxt-link>
  </div>
</template>
