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
    <div v-if="props.title" class="sticky top-0 bg-white z-10 py-2 flex items-end text-2xl font-semibold border-b-2 border-black">
      {{ props.title }}
    </div>

    <slot />
  </div>
</template>
