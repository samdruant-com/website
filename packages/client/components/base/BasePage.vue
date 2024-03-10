<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    defualt: undefined
  }
});
</script>

<template>
  <div class="flex flex-col p-2">
    <div v-if="props.title" id="page-title">
      <h1 class="text-2xl font-semibold">{{ props.title }}</h1>
    </div>

    <div class="mt-2">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* set a thick underline for h1 child element in #page-title */
#page-title > h1 {
  border-bottom: 3px solid;
}
</style>