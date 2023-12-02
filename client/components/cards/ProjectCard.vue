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
    <h3 class="px-2">{{ props.project.name }}</h3>
    <v-row v-if="props.admin" no-gutters>
      <v-col cols="3" class="mx-1" v-for="option in options" :key="option.label">
        <base-btn block small :color="option.color" :to="option.to" @click="option.action">
          {{ option.label }}
        </base-btn>
      </v-col>
      <v-col cols="3" class="mx-1">
        <v-chip v-if="props.project.visible === false" size="small">
          <v-icon left>mdi-eye-off</v-icon>
          <span>Hidden</span>
        </v-chip>
      </v-col>
    </v-row>
  </base-card>
</template>
