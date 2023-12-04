<script setup lang="ts">
import { usePortfolioStore } from '~/stores/portfolio-store';

definePageMeta({ middleware: ['auth'] });

const router = useRouter();
const portfolioStore = usePortfolioStore();
</script>

<template>
  <base-page title="Portfolio">
    <portfolio-form v-if="portfolioStore.portfolio" :portfolio="portfolioStore.portfolio"
      @updated="router.push('/contact')" />
  </base-page>
</template>