<script setup lang="ts">
import { usePortfolioStore } from "~/stores/portfolio.store";

const { data, error } = await useFetch("/api/artists");

const portfolioStore = usePortfolioStore();

if (error.value) {
  console.error("Failed to fetch portfolio data:", error.value);
} else if (data.value && data.value.length > 0) {
  portfolioStore.setPortfolio(data.value[0]);
}

useSeoSetup();
</script>

<template>
  <div class="min-h-svh flex flex-col">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
