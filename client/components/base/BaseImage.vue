<script setup lang="ts">
import LazyImage from "~/public/images/landing.webp";

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: 'image'
  },
  width: {
    type: [Number, String],
    default: 'auto'
  },
  height: {
    type: [Number, String],
    default: '100%'
  },
  cover: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <v-img :src="props.src" :lazy-src="LazyImage" :height="props.height" :width="props.width" :alt="props.alt"
    :cover="props.cover" />
</template>