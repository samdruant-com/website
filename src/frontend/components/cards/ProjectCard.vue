<script setup lang="ts">
import type { Image, Project } from "~/types";

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true
  }
});

const getThumbnail = computed<Image>(() => {
  return props.project.works[0]?.photos[0];
});

const getYear = computed<string>(() => {
  return props.project.date;
});
</script>

<template>
  <base-card>
    <nuxt-link :to="`/projects/${props.project.slug}`">
      <image-card :image="getThumbnail" :hide-details="true" />
    </nuxt-link>

    <div class="flex justify-between">
      <p class="self-center">
        <span class="font-bold">{{ props.project.title }}</span>, {{ getYear }}
      </p>
    </div>
  </base-card>
</template>
