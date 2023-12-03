<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio-store';

const portfolioStore = usePortfolioStore();
</script>

<template>
  <v-footer app color="transparent">
    <v-row justify="end" align="center">
      <v-col v-for="social in portfolioStore.portfolio.socials" :key="social.name" cols="auto">
        <a class="plain" target="_blank" rel="noreferrer" :href="social.url">
          {{ social.name }}
        </a>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <a class="hide-link" target="_blank" rel="noreferrer" href="https://www.oliverrr.net">
          Oliver 🤠
        </a>
      </v-col>
    </v-row>
  </v-footer>
</template>
