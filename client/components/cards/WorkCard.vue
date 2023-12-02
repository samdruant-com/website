<script setup lang="ts">
import type { Work, Image } from "~/types";
import type { ActionItem } from "~/components/base/BaseCard.vue";

const props = defineProps({
  work: {
    type: Object as PropType<Work>,
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
        color: 'warning',
        to: `/works/${props.work.slug}/edit`,
      },
    ]
    : [];
});

const getWorkThumbnail = (work: Work): Image => {
  return work.images[0];
};
</script>

<template>
  <base-card>
    <nuxt-link :to="`/works/${props.work.slug}`">
      <image-card :image="getWorkThumbnail(props.work)" />
    </nuxt-link>
    <h3 class="px-2">{{ props.work.name }}</h3>
    <v-row no-gutters>
      <v-col cols="3" class="mx-1" v-for="option in options" :key="option.label">
        <base-btn block small :color="option.color" :to="option.to" @click="option.action">
          {{ option.label }}
        </base-btn>
      </v-col>
    </v-row>
  </base-card>
</template>
