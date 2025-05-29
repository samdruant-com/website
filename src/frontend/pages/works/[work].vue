<script setup lang="ts">
import type { Work } from "~/types";
import { useWorkStore } from "~/stores/work.store";

const workStore = useWorkStore();

const route = useRoute();

const work = ref<Work>();

const getTitle = computed<string>(() => {
  const name = work.value?.title || "N/a";
  const year = work.value?.date || "N/a";

  return `${name}, ${year}`;
});

onMounted(async () => {
  const id = route.params.work;

  try {
    if (!id) {
      throw new Error("id is not defined");
    }

    work.value = await workStore.getWork(id as string);

    const thumbnail = work.value.images[0]?.url || undefined;
    useSeoSetup({ title: work.value.name, image: thumbnail });
  } catch (error) {
    console.error(error);
    useSeoSetup({ title: "Work Not Found" });
  }
});
</script>

<template>
  <base-page :title="getTitle">
    <div v-if="work" class="flex flex-col gap-4">
      <div v-for="image in work.photos" :key="image.id">
        <image-card :image="image" :expand="true" />
      </div>
    </div>
  </base-page>
</template>
