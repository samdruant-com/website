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
    <div v-if="props.title" id="page-title" style="border-bottom: 3px solid; ">
      <h1 class="text-2xl font-semibold">{{ props.title }}</h1>
    </div>

    <div class="mt-2">
      <slot />
    </div>
  </div>
</template>