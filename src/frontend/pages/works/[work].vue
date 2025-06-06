<script setup lang="ts">
import { useWorkStore } from "~/stores/work.store";

const workStore = useWorkStore();

const route = useRoute();

const { data, error, status } = await useAsyncData("work", async () => {
  const id = route.params.work;

  if (!id) {
    throw new Error("Work ID is not defined");
  }

  const work = await workStore.getWork(id as string);
  const thumbnail = work.photos[0]?.url || undefined;
  useSeoSetup({ title: work.title, image: thumbnail });

  return work;
});

const getTitle = computed<string>(() => {
  const name = data.value?.title || "N/a";
  const year = data.value?.date || "N/a";

  return `${name}, ${year}`;
});
</script>

<template>
  <base-page :title="getTitle">
    <div v-if="data" class="flex flex-col gap-4">
      <image-card
        v-for="image in data.photos"
        :key="image.id"
        :image="image"
        :expand="true"
      />
    </div>
    <div v-else-if="error" class="text-red-500">
      <p>Error loading work: {{ error.message }}</p>
    </div>
    <div v-else-if="status === 'pending'" class="text-gray-500">
      <p>Loading work...</p>
    </div>
    <div v-else class="text-gray-500">
      <p>No work found.</p>
    </div>
  </base-page>
</template>
