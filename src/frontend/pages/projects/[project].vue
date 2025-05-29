<script setup lang="ts">
import type { Project } from "~/types";
import { useProjectStore } from "~/stores/project.store";

const projectStore = useProjectStore();
const route = useRoute();

const project = ref<Project>();

const getTitle = computed<string>(() => {
  const name = project.value?.title || "N/a";
  const year = project.value?.date || "N/a";

  return `${name}, ${year}`;
});

onMounted(async () => {
  const id = route.params.project;

  try {
    if (!id) {
      throw new Error("Missing project id");
    }

    project.value = await projectStore.getProject(id as string);

    const thumbnail = project.value.works[0]?.photos[0]?.url || undefined;
    useSeoSetup({ title: project.value.title, image: thumbnail });
  } catch (error) {
    console.error("Failed to load project:", error);
    useSeoSetup({ title: "Project Not Found" });
  }
});
</script>

<template>
  <base-page :title="getTitle" class="flex flex-col md:grid md:grid-cols-2 gap-4">
    <div v-for="work in project?.works" :key="work.id">
      <work-card :work="work" />
    </div>
  </base-page>
</template>
