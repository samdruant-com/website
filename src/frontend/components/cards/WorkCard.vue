<script setup lang="ts">
import type { Image, Work } from "~/types";

const props = defineProps({
  work: {
    type: Object as PropType<Work>,
    required: true
  }
});

const getThumbnail = computed<Image>(() => {
  return props.work.photos[0];
});

const getYear = computed<string>(() => {
  return props.work.date;
});
</script>

<template>
  <base-card>
    <nuxt-link :to="`/works/${props.work.slug}`">
      <image-card :image="getThumbnail" :hide-details="true" />
    </nuxt-link>

    <div class="flex justify-between">
      <p class="self-center">
        <span class="font-bold">{{ props.work.title }}</span>, {{ getYear }}
      </p>
    </div>
  </base-card>
</template>
