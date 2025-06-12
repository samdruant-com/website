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

const formatter = useFormatter();

const getThumbnail = computed<Image>(() => {
  return props.work.photos[0];
});
</script>

<template>
  <nuxt-link class="flex flex-col h-full w-full" :to="`/works/${props.work.slug}`">
    <base-image
      class="h-full w-full"
      :image="getThumbnail"
      image-style="cover"
      :hide-caption="props.minimal"
    />

    <p class="h-12 mt-2">
      <span class="font-bold">{{ props.work.title }}</span>, {{ formatter.convertDateToYear(props.work.date) }}
    </p>
  </nuxt-link>
</template>
