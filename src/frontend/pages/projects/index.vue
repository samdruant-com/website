<script setup lang="ts">
import type { Project } from "~/types";
import { useProjectStore } from "~/stores/project.store";

const projectStore = useProjectStore();
const projects = ref<Project[]>([]);

const getSortedProjects = computed(() =>
// sort works by date (unix timestamp) latest first
  [...projects.value].sort(
    (a: Project, b: Project) => Number(b.date) - Number(a.date)
  )
);

onMounted(async () => {
  projects.value = await projectStore.indexProjects();

  const thumbnail = projects.value[0]?.works[0]?.images[0]?.url || undefined;
  useSeoSetup({ title: "Projects", image: thumbnail });
});
</script>

<template>
  <base-page title="Projects" class="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div v-for="project in getSortedProjects" :key="project.id">
      {{ project.title }}
      <project-card :project="project" />
    </div>
  </base-page>
</template>
