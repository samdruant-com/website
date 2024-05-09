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

const { convertUnixToDateTime } = useDate();

const options = computed<ActionItem[]>(() => {
  return props.admin
    ? [
      {
        label: "Edit",
        size: "small",
        block: true,
        color: 'bg-amber-300',
        to: `/works/${props.work.slug}/edit`,
      },
    ]
    : [];
});

const getThumbnail = computed<Image>(() => {
  return props.work.images[0];
});

const getYear = computed<string>(() => {
  const timestamp = Number(props.work.date);
  return convertUnixToDateTime(timestamp).date.split('-')[0];
});

</script>

<template>
  <base-card>
    <nuxt-link :to="`/works/${props.work.slug}`">
      <image-card :image="getThumbnail" :hide-details="true" />
    </nuxt-link>

    <div class="flex justify-between">
      <p class="self-center">
        <span class="font-bold">{{ props.work.name }}</span>, {{ getYear }}
      </p>

      <div v-if="props.admin" class="mt-2 flex gap-2 justify-end">
        <base-btn v-for="option in options" :key="option.label" :class="`ml-auto ${option.color ? option.color : ''}`"
          :to="option.to" @click="option.action">
          {{ option.label }}
        </base-btn>

        <div v-if="props.work.visible === false" class="p-1 bg-amber-100 text-center rounded-lg">
          <span class="i-mdi-eye-off" />
          <p class="text-sm">Hidden</p>
        </div>
      </div>
    </div>
  </base-card>
</template>
