<script setup lang="ts">
import { useAuthStore } from '~/stores/auth.store';

definePageMeta({ middleware: ['auth'] });

const router = useRouter();
const authStore = useAuthStore();

</script>

<template>
  <base-page title="Profile">
    <user-form v-if="authStore.user" :user="authStore.user" @updated="router.push('/')" />
  </base-page>
</template>~/stores/auth.store