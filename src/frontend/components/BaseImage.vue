<script setup lang="ts">
import type { Image } from "~/types";

const props = defineProps<{
  image: Image
  imageStyle?: "cover" | "contain"
  hideCaption?: boolean
}>();

const getImageStyle = computed(() => {
  return props.imageStyle === "cover" ? "object-cover" : "object-contain";
});
</script>

<template>
  <div class="flex flex-col items-center">
    <img
      :src="props.image.url"
      :alt="props.image.caption"
      :class="`h-full w-full ${getImageStyle}`"
    >
    <div v-if="props.image.caption && !hideCaption" class="w-full mt-2 text-end md:text-xs">
      {{ props.image.caption }}
    </div>
  </div>
</template>
