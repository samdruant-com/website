<script setup lang="ts">
import type { Project } from "~/types";
import { useProjectStore } from "~/stores/project.store";

const projectStore = useProjectStore();

const { data, error } = await useAsyncData("projects", async () => {
  const projects = await projectStore.indexProjects();
  const thumbnail = projects[0]?.works[0]?.photos[0]?.url || undefined;
  useSeoSetup({ title: "Projects", image: thumbnail });
  return projects;
});

const getSortedProjects = computed(() => {
  if (!data.value || error.value) {
    return [];
  }

  // sort works by date (unix timestamp) latest first
  return [...data.value].sort(
    (a: Project, b: Project) => Number(b.date) - Number(a.date)
  );
});
</script>

<template>
  <base-page title="Projects">
    <div v-if="getSortedProjects.length > 0" class="flex flex-col md:grid md:grid-cols-3 gap-4">

      <project-card
        v-for="project in getSortedProjects"
        :key="project.id"
        :project="project"
      />

    <div v-else-if="error" class="text-red-500 text-center">
      <p>Error loading projects: {{ error }}</p>
    </div>

    <div v-else class="text-center text-gray-500">
      No projects found.
    </div>
  </base-page>
</template>
