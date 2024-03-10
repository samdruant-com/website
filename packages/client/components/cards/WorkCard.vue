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

    <p class="font-bold">{{ props.work.name }}</p>
    
    <div v-if="props.admin" class="grid grid-cols-3 mt-2">
      <base-btn v-for="option in options" :key="option.label" class="mx-1" :to="option.to" @click="option.action">
        {{ option.label }}
      </base-btn>

      <div v-if="props.work.visible === false" class="mx-1 p-1 bg-amber-100 text-center rounded-lg">
        <span class="i-mdi-eye-off" />
        <p class="text-sm">Hidden</p>
      </div>
    </div>
  </base-card>
</template>
