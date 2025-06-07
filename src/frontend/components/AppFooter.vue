<script setup lang="ts">
import { usePortfolioStore } from "~/stores/portfolio.store";

const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="flex flex-row gap-2 mt-2 mx-2 p-2">
    <a
      v-for="social in portfolioStore.getPortfolio.links"
      :key="social.name"
      :href="social.url"
      class="plain"
      target="_blank"
      rel="noreferrer"
    >
      {{ social.name }}
    </a>

    <a
      class="ml-auto hide-link"
      target="_blank"
      rel="noreferrer"
      href="https://www.oliverrr.net"
    >
      Oliver 🤠
    </a>
  </div>
</template>
