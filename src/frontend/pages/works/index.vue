<script setup lang="ts">
import type { Work } from "~/types";
import { useWorkStore } from "~/stores/work.store";

useSeoSetup({ title: "Works" });

const workStore = useWorkStore();

const works = ref<Work[]>([]);

const getSortedWorks = computed(() =>
// sort works by date (unix timestamp) latest first
  [...works.value].sort((a: Work, b: Work) => Number(b.date) - Number(a.date))
);

onMounted(async () => {
  works.value = await workStore.indexWorks();
});
</script>

<template>
  <base-page title="Works">
    <div v-if="getSortedWorks.length > 0" class="flex flex-col md:grid md:grid-cols-3 gap-4">
      <work-card
        v-for="work in getSortedWorks"
        :key="work.id"
        :work="work"
      />
    </div>

    <div v-else class="text-center text-gray-500">
      No works found.
    </div>
  </base-page>
</template>
