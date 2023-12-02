<script setup lang="ts">
import type { Image } from "~/types";

const props = defineProps({
  image: {
    type: Object as PropType<Image>,
    required: true,
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
  expand: {
    type: Boolean,
    default: false,
  },
});

const details = computed<string>(() => {
  return getImageDetail(props.image);
});

const getImageDetail = (image: Image): string => {
  const { place, photographer } = image;

  let detail = "";

  if (place && photographer) {
    detail = `Photographed by ${photographer} at ${place}`;
  } else if (place) {
    detail = `Displayed at ${place}`;
  } else if (photographer) {
    detail = `Photographed by ${photographer}`;
  }

  return detail;
};
</script>

<template>
  <div id="image-card">
    <base-image :src="props.image.src" :cover="!props.expand" :height="props.expand ? '100%' : '500px'"
      :width="props.expand ? '100%' : 'auto'" />
    <v-divider v-if="!props.hideDetails" class="border-opacity-0" />
    <small v-if="!props.hideDetails" id="image-description">{{ details }}</small>
  </div>
</template>

<style scoped>
#image-card {
  width: 100%;
}

#image-description {
  width: 50%;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>