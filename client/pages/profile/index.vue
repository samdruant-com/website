<script setup lang="ts">
import { useAuthStore } from '~/stores/auth-store';
import { usePortfolioStore } from '~/stores/portfolio-store';

definePageMeta({ middleware: ['auth'] });

const router = useRouter();
const authStore = useAuthStore();
const portfolioStore = usePortfolioStore();

type Tab = 'account' | 'portfolio';
const currentTab = ref('portfolio');

const tabOptions = computed<Tab[]>(() => {
  return ['portfolio', 'account'];
});

</script>

<template>
  <base-page title="Profile">

  <v-tabs v-model="currentTab">
    <v-tab v-for="tab in tabOptions" :key="tab" :href="`#${tab}`" :active="currentTab === tab" color="primary" @click="currentTab = tab">
      {{ tab }}
    </v-tab>
  </v-tabs>

  <v-window v-model="currentTab" class="pa-2">
    <v-window-item value="portfolio" id="portfolio">
      <portfolio-form v-if="portfolioStore.portfolio" :portfolio="portfolioStore.portfolio" @updated="router.push('/contact')" />
    </v-window-item>
    <v-window-item value="account" id="account">
      <user-form v-if="authStore.user" :user="authStore.user" @updated="router.push('/')" />
    </v-window-item>
  </v-window>
  
  </base-page>
</template>