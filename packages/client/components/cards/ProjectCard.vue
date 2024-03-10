<script setup lang="ts">
import type { Project, Image } from "~/types";
import type { ActionItem } from "~/components/base/BaseCard.vue";

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

const options = computed<ActionItem[]>(() => {
  return props.admin
    ? [
      {
        label: "Edit",
        size: "small",
        block: true,
        outlined: true,
        color: 'warning',
        to: `/projects/${props.project.slug}/edit`,
      }
    ]
    : [];
});

const getProjectThumbnail = (project: Project): Image => {
  return project.works[0]?.images[0];
};
</script>

<template>
  <base-card>
    <nuxt-link :to="`/projects/${props.project.slug}`">
      <image-card :image="getProjectThumbnail(props.project)" />
    </nuxt-link>
    
    <p class="font-bold">{{ props.project.name }}</p>
    
    <div v-if="props.admin" class="grid grid-cols-3 mt-2">
      <base-btn class="mx-1" v-for="option in options" :key="option.label" :color="option.color" :to="option.to" @click="option.action">
        {{ option.label }}
      </base-btn>
      
      <div v-if="props.project.visible === false" class="mx-1 p-1 bg-amber-100 text-center rounded-lg">
        <span class="i-mdi-eye-off" />
        <p class="text-sm">Hidden</p>
      </div>
    </div>
  </base-card>
</template>
