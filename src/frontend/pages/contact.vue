<script setup lang="ts">
import { usePortfolioStore } from "~/stores/portfolio.store";

const formatter = useFormatter();
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
      <div v-if="portfolioStore.getPortfolio.photo" class="md:col-span-8 flex flex-col items-center p-2">
        <base-image :image="portfolioStore.getPortfolio.photo" />
      </div>

      <div class="md:col-span-4 p-2 flex flex-col md:justify-center">
        <div
          v-if="portfolioStore.getPortfolio.description"
          class="mt-4 w-full"
          v-html="formatter.convertMarkdownToHtml(portfolioStore.getPortfolio.description)"
        />

        <div class="flex flex-col gap-2 mt-4 md:pl-2">
          <a
            v-for="social in portfolioStore.getPortfolio.links"
            :key="social.name"
            class="hide-link hover:underline"
            :href="social.url"
            target="_blank"
            rel="noreferrer"
          >
            <span v-if="social.name.toLowerCase() === 'email'">reach me by </span>
            <span v-else>visit my </span>
            <b>{{ social.name }}</b>
          </a>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
