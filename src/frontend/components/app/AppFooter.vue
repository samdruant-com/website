<script setup lang="ts">
import { usePortfolioStore } from "~/stores/portfolio.store";

const portfolioStore = usePortfolioStore();
</script>

<template>
  <div class="flex flex-row gap-2 mt-2 mx-2 p-2">
    <a
      v-for="social in portfolioStore.portfolio.socials"
      :key="social.name"
      class="plain"
      target="_blank"
      rel="noreferrer"
      :href="social.url"
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
