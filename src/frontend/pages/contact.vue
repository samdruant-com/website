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
  <base-page>
    <div class="flex flex-col md:flex-row md:justify-around gap-2">
      <image-card
        v-if="portfolioStore.getPortfolio.photo"
        class="md:w-4/12"
        :image="portfolioStore.getPortfolio.photo"
        :hide-details="true"
        :expand="true"
      />

      <div class="md:w-4/12 p-2 flex flex-col md:justify-center">
        <p>
          {{ portfolioStore.getPortfolio.description }}
        </p>

        <div class="pl-4 flex flex-col gap-2 mt-4">
          <a
            v-for="social in portfolioStore.getPortfolio.links"
            :key="social.name"
            class="hide-link"
            :href="social.url"
            target="_blank"
            rel="noreferrer"
          >
            visit my <b>{{ social.name }}</b>
          </a>
        </div>
      </div>
    </div>
  </base-page>
</template>
