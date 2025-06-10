<script setup lang="ts">
import { usePortfolioStore } from "~/stores/portfolio.store";

const portfolioStore = usePortfolioStore();

useSeoSetup({
  title: "Contact",
  description: portfolioStore.getPortfolio.description,
  image: portfolioStore.getPortfolio.photo?.url
});
</script>

<template>
  <NuxtLayout name="page" title="Contact">
    <div class="flex flex-col gap-2 md:grid md:grid-cols-12 md:place-content-center">
      <div v-if="portfolioStore.getPortfolio.photo" class="md:col-span-8 p-2">
        <img
          :src="portfolioStore.getPortfolio.photo.url"
          :alt="portfolioStore.getPortfolio.photo.caption"
          class="w-full h-auto object-contain"
        >
      </div>

      <div class="md:col-span-4 p-2 flex flex-col md:justify-center">
        <p>
          {{ portfolioStore.getPortfolio.description }}
        </p>

        <div class="flex flex-col gap-2 mt-4 md:pl-2">
          <a
            v-for="social in portfolioStore.getPortfolio.links"
            :key="social.name"
            class="hide-link hover:underline"
            :href="social.url"
            target="_blank"
            rel="noreferrer"
          >
            visit my <b>{{ social.name }}</b>
          </a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
