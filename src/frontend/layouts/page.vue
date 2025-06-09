<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    defualt: undefined
  }
});
</script>

<template>
  <div class="flex flex-col gap-2 p-2">
    <h1 v-if="props.title" class="text-2xl font-semibold border-b-2 border-black">
      {{ props.title }}
    </h1>

    <slot />
  </div>
</template>
