<script setup lang="ts">
import type { Image, Work } from "~/types";

const props = defineProps({
  work: {
    type: Object as PropType<Work>,
    required: true
  },
  minimal: {
    type: Boolean,
    default: false
  }
});

const getThumbnail = computed<Image>(() => {
  return props.work.photos[0];
});
</script>

<template>
  <nuxt-link class="flex flex-col" :to="`/works/${props.work.slug}`">
    <img
      :src="getThumbnail.url"
      :alt="getThumbnail.caption"
      class="h-full w-full object-cover"
    >

    <div v-if="!props.minimal && getThumbnail" class="mt-2">
      {{ getThumbnail.caption }}
    </div>

    <p>
      <span class="font-bold">{{ props.work.title }}</span>, {{ props.work.date }}
    </p>
  </nuxt-link>
</template>
