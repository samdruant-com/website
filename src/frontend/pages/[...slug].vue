<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <NuxtLayout name="page" title="Oops">
    <p>Can't find a page that matches the <code class="underline">{{ route.path }}</code> path</p>
  </NuxtLayout>
</template>
