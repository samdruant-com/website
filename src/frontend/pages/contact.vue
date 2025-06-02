<script setup lang="ts">
import type { Image } from "~/types";
import { usePortfolioStore } from "~/stores/portfolio.store";

useSeoSetup({ title: "Contact" });

const portfolioStore = usePortfolioStore();

const getImage = computed<Image>(() => {
  return {
    id: "contact",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    url: "/images/contact.webp",
    caption: "Contact"
  };
});
</script>

<template>
  <base-page>
    <div class="flex flex-col-reverse md:flex-row md:justify-center gap-2">
      <image-card
        class="md:w-4/12"
        :image="getImage"
        :hide-details="true"
        :expand="true"
      />

      <div class="p-2 flex flex-col">
        <a class="hide-link" :href="`mailto:${portfolioStore.getEmail}`"><b>email</b> me</a>
        <a
          v-for="social in portfolioStore.getSocials"
          :key="social.name"
          class="hide-link"
          target="_blank"
          rel="noreferrer"
          :href="social.url"
        ><b>visit</b> my {{ social.name }}</a>
      </div>
    </div>
  </base-page>
</template>
