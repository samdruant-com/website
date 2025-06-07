<script setup lang="ts">
import { useProjectStore } from "~/stores/project.store";

const projectStore = useProjectStore();
const route = useRoute();

const { data, error } = await useAsyncData("project", async () => {
  const id = route.params.project;

  if (!id) {
    throw new Error("Project ID is not defined");
  }

  const project = await projectStore.getProject(id as string);
  const thumbnail = project.works[0]?.photos[0]?.url || undefined;
  useSeoSetup({ title: project.title, image: thumbnail });

  return project;
});

const getProjectTitle = computed<string>(() => {
  const name = data.value?.title || "N/a";
  const year = data.value?.date || "N/a";

  return `${name}, ${year}`;
});
</script>

<template>
  <base-page :title="getProjectTitle">
    <div v-if="data" class="flex flex-col md:grid md:grid-cols-2 gap-4">
      <work-card
        v-for="work in data?.works"
        :key="work.id"
        :work="work"
      />
    </div>
    <div v-else-if="error" class="text-red-500">
      <p>Error loading project: {{ error.message }}</p>
    </div>
    <div v-else class="text-gray-500">
      <p>No project found.</p>
    </div>
  </base-page>
</template>
