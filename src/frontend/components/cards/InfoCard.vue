<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    required: true
  },

  htmlIsh: {
    type: Boolean,
    default: false
  },

  color: {
    type: String,
    default: "primary"
  }
});
</script>

<template>
  <base-card :color="props.color">
    <span v-if="props.htmlIsh" v-html="props.message" />
    <span v-else>{{ props.message }}</span>
  </base-card>
</template>
