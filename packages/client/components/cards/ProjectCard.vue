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

const { convertUnixToDateTime } = useDate();

const options = computed<ActionItem[]>(() => {
  return props.admin
    ? [
      {
        label: "Edit",
        size: "small",
        block: true,
        outlined: true,
        color: 'bg-amber-300',
        to: `/projects/${props.project.slug}/edit`,
      }
    ]
    : [];
});

const getThumbnail = computed<Image>(() => {
  return props.project.works[0]?.images[0];
});

const getYear = computed<string>(() => {
  const timestamp = Number(props.project.date);
  return convertUnixToDateTime(timestamp).date.split('-')[0];
});
</script>

<template>
  <base-card>
    <nuxt-link :to="`/projects/${props.project.slug}`">
      <image-card :image="getThumbnail" :hide-details="true" />
    </nuxt-link>

    <div class="flex justify-between">
      <p class="self-center">
        <span class="font-bold">{{ props.project.name }}</span>, {{ getYear }}
      </p>

      <div v-if="props.admin" class="mt-2 flex gap-2 justify-end">
        <base-btn v-for="option in options" :key="option.label" :class="`ml-auto ${option.color ? option.color : ''}`"
          :to="option.to" @click="option.action">
          {{ option.label }}
        </base-btn>

        <div v-if="props.project.visible === false" class="p-1 bg-amber-100 text-center rounded-lg">
          <span class="i-mdi-eye-off" />
          <p class="text-sm">Hidden</p>
        </div>
      </div>
    </div>
  </base-card>
</template>
