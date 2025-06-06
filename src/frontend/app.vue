<script setup lang="ts">
import { usePortfolioStore } from "~/stores/portfolio.store";

const portfolioStore = usePortfolioStore();

const { data, error } = await useFetch("/api/artists");

if (!data.value || error.value) {
  console.error("Failed to fetch portfolio data:", error.value);
} else if (data.value.length === 0) {
  console.warn("No portfolio data found.");
} else {
  // Set the portfolio data in the store
  portfolioStore.setPortfolio(data.value[0]);

  // Use the portfolio for SEO setup
  useSeoSetup({
    title: portfolioStore.getPortfolio.name || "Sam Druant",
    description: portfolioStore.getPortfolio.description || "Portfolio of Sam Druant, a creative artist.",
    image: portfolioStore.getPortfolio.featuredPhoto?.url || "/images/landing.webp"
  });
}
</script>

<template>
  <div class="min-h-svh flex flex-col">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
