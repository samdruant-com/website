<script setup lang="ts">
import { usePortfolioStore } from "~/stores/portfolio.store";

definePageMeta({ layout: "landing" });
useSeoSetup();

const portfolioStore = usePortfolioStore();

const getBackgroundImage = computed<string>(() => {
  return portfolioStore.getPortfolio.featuredPhoto?.url || "/images/landing.webp";
});
</script>

<template>
  <div id="start-page" :style="{ backgroundImage: `url(${getBackgroundImage})` }">
    <nuxt-link class="landing-text s-brand hide-link" to="/projects">
      <h1 class="text-center text-background">
        {{ portfolioStore.getPortfolio.name }}
      </h1>
    </nuxt-link>
  </div>
</template>

<style scoped>
#start-page {
  position: relative;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.landing-text {
  font-size: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
