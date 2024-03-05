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
  const { place, photographer } = props.image;
  
  let detail = "";
  
  if (place && photographer) {
    detail = `Photographed by ${photographer} at ${place}`;
  } else if (place) {
    detail = `Displayed at ${place}`;
  } else if (photographer) {
    detail = `Photographed by ${photographer}`;
  }
  
  return detail;
});

const getClass = computed<string>(() => {
  let c = "mb-2 h-56 md:h-96 object-cover bg-gray-200";

  //if (props.expand) {
  //  c += " h-full w-full";
  //}

  return c;
});
</script>

<template>
  <div class="h-full w-full">
    <img
          :src="props.image.src"
          :alt="details"
          :class="getClass"
        >
    <p v-if="!props.hideDetails" class="text-sm">{{ details }}</p>
  </div>
</template>
