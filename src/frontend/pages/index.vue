<script setup lang="ts">
import { usePortfolioStore } from "~/stores/portfolio.store";

definePageMeta({ layout: "landing" });

const portfolioStore = usePortfolioStore();

const getBackgroundImage = computed<string>(() => {
  return portfolioStore.getPortfolio.featuredPhoto?.url || "/images/landing.webp";
});
</script>

<template>
  <nuxt-link
    id="start-page"
    to="/projects"
    :style="{ backgroundImage: `url(${getBackgroundImage})` }"
    class="block relative h-screen bg-cover bg-center bg-no-repeat cursor-pointer"
  >
    <h1 class="text-center text-background text-[1.5rem] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      {{ portfolioStore.getPortfolio.name }}
    </h1>
  </nuxt-link>
</template>
