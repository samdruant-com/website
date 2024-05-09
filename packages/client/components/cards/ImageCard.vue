<script setup lang="ts">
import type { Image } from "~/types";

const props = defineProps({
  image: {
    type: Object as PropType<Image>,
    required: true,
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
  adminMode: {
    type: Boolean,
    default: false,
  },
  expand: {
    type: Boolean,
    default: false,
  },
});

const emtis = defineEmits(["caption"]);

const form = reactive({
  caption: props.image.caption || "",
});

const getClass = computed<string>(() => {
  let componentClass = "mb-2 object-cover bg-gray-200";

  if (props.expand) {
    // add more classes
    componentClass += " w-full h-full";
  } else {
    componentClass += " w-full h-56 md:h-96";
  }

  return componentClass;
});

watch(
  () => form.caption,
  (newCaption) => {
    emtis("caption", newCaption);
  }
);
</script>

<template>
  <div class="h-full w-full">
    <img :src="props.image.src" :alt="props.image.caption" :class="getClass">

    <div v-if="props.adminMode" class="my-1">
      <input-text v-model="form.caption" place-holder="Caption" />
    </div>
    <p v-else-if="!props.hideDetails" class="text-sm">{{ props.image.caption || 'no caption' }}</p>
  </div>
</template>
