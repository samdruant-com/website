<script setup lang="ts">

const props = defineProps({
  title: {
    type: String,
    defualt: undefined
  }
});
</script>

<template>
  <v-row
    justify="center"
    class="pa-1">
    <v-col
      v-if="props.title"
      id="page-title"
      class="text-center my-1">
      <h1>{{ props.title }}</h1>
    </v-col>

    <v-divider class="border-opacity-0"></v-divider>

    <v-col>
      <slot />
    </v-col>
  </v-row>
</template>

<style scoped>
/* set a thick underline for h1 child element in #page-title */
#page-title > h1 {
  border-bottom: 3px solid;
}

</style>