<script setup lang="ts">
import type { Work } from '~/types';

definePageMeta({ middleware: ['auth'] });

const router = useRouter();
</script>

<template>
  <BasePage>
    <WorkForm
    @created="(work: Work) => router.push(`/works/${work.slug}`)" />
  </BasePage>
</template>