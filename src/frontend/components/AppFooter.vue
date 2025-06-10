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
      class="plain hover:underline"
      target="_blank"
      rel="noreferrer"
    >
      {{ social.name }}
    </a>

    <span class="ml-auto">
      website by
      <a
        class="hover:underline"
        target="_blank"
        rel="noreferrer"
        href="https://www.oliverrr.net"
      >
        Oliver 🤠
      </a>
    </span>
  </div>
</template>
