<script setup lang="ts">
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
  <v-img :src="props.src" lazy-src="/images/landing.webp" :height="props.height" :width="props.width" :alt="props.alt"
    :cover="props.cover" />
</template>