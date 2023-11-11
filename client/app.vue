<script setup lang="ts">

const title = ref<string>('Nuxt Template');
const description = ref<string>('A Nuxt template for quickly starting a new project');

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
