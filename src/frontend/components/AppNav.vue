<script setup lang="ts">
import { useGeneralStore } from "~/stores/app.store";
import { usePortfolioStore } from "~/stores/portfolio.store";

const generalStore = useGeneralStore();
const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="flex flex-row items-center md:mr-20">
    <button class="basis-1/4 grow-0 ml-2 p-2 flex items-center text-3xl md:hidden" color="transparent" @click="generalStore.toggleSidebar">
      <span class="i-mdi-menu" />
    </button>

    <router-link class="basis-1/2 md:basis-1/4 mr-auto flex items-center justify-center text-3xl font-semibold text-center mt-0" to="/">
      {{ portfolioStore.getPortfolio.name }}
    </router-link>

    <nuxt-link
      v-for="page in generalStore.pages"
      :key="page.label"
      class="mr-4 place-content-end hidden lg:block text-xl hover:underline"
      :to="page.to"
    >
      {{ page.label }}
    </nuxt-link>
  </div>
</template>
