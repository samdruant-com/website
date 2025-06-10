<script setup lang="ts">
import type { Work } from "~/types";
import { useWorkStore } from "~/stores/work.store";

const workStore = useWorkStore();
const formatter = useFormatter();

const { data, error } = await useAsyncData("works", async () => {
  const works = await workStore.indexWorks();
  const thumbnail = works[0]?.photos[0]?.url || undefined;
  useSeoSetup({ title: "Works", image: thumbnail });
  return works;
});

useSeoSetup({ title: "Works" });

const getSortedWorks = computed(() => {
  if (!data.value || error.value) {
    return [];
  }

  return formatter.sortListByDate(data.value) as Work[];
});
</script>

<template>
  <NuxtLayout name="page" title="Works">
    <div v-if="getSortedWorks.length > 0" class="flex flex-col md:grid md:grid-cols-3 gap-4">
      <work-card
        v-for="work in getSortedWorks"
        :key="work.id"
        :work="work"
        :minimal="true"
        class="md:h-[60vh]"
      />
    </div>

    <div v-else-if="error" class="text-red-500 text-center">
      <p>Error loading works: {{ error.message }}</p>
    </div>

    <div v-else class="text-center text-gray-500">
      No works found.
    </div>
  </NuxtLayout>
</template>
