<script setup lang="ts">
import type { Image } from "~/types";

const props = defineProps<{
  image: Image
  imageStyle?: "cover" | "contain"
  hideCaption?: boolean
  rotateCaption?: boolean
}>();

const getImageStyle = computed(() => {
  return props.imageStyle === "cover" ? "object-cover" : "object-contain";
});

const getCaptionParentStyle = computed(() => {
  return props.rotateCaption ? "md:flex-row" : "";
});

const getCaptionStyle = computed(() => {
  return props.rotateCaption ? "md:w-fit md:text-start md:mt-0 md:flex md:-rotate-90 md:whitespace-nowrap" : "";
});
</script>

<template>
  <div class="flex flex-col items-center" :class="`${getCaptionParentStyle}`">
    <img
      :src="props.image.url"
      :alt="props.image.caption"
      :class="`${getImageStyle}`"
      class="h-full w-full"
    >
    <div
      v-if="props.image.caption && !hideCaption"
      :class="`${getCaptionStyle}`"
      class="w-full mt-2 text-end md:text-xs"
    >
      {{ props.image.caption }}
    </div>
  </div>
</template>
