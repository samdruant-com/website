<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio.store';

useSeoSetup({ title: "Contact" });

const portfolioStore = usePortfolioStore();

</script>

<template>
  <base-page>
    <div class="grid grid-cols-2">
      <img src="/images/contact.jpg" height="700px" width="500px" />

      <div class="p-2 flex flex-col">
        <a class="hide-link" :href="`mailto:${portfolioStore.portfolio.email}`"><b>email</b> me</a>
        <a v-for="social in portfolioStore.portfolio.socials" :key="social.name" class="hide-link" target="_blank" rel="noreferrer" :href="social.url"><b>visit</b> my {{ social.name }}</a>
      </div>
    </div>
  </base-page>
</template>
