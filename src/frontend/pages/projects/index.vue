<script setup lang="ts">
import type { Image, Project } from "~/types";
import { useProjectStore } from "~/stores/project.store";

const formatter = useFormatter();
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

function getThumbnail(project: Project): Image {
  const fallBackThumbnail: Image = {
    id: "default-thumbnail",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    url: "/images/landing.webp",
    caption: "Default thumbnail"
  };

  return project.works[0]?.photos[0] || fallBackThumbnail;
}
</script>

<template>
  <NuxtLayout name="page" title="Projects">
    <div v-if="getSortedProjects.length > 0" class="flex flex-col md:grid md:grid-cols-3 gap-4">
      <nuxt-link
        v-for="project in getSortedProjects"
        :key="project.id"
        class="flex flex-col md:h-[60vh]"
        :to="`/projects/${project.slug}`"
      >
        <img
          :src="getThumbnail(project).url"
          :alt="getThumbnail(project).caption"
          class="h-full w-full object-cover"
        >

        <p>
          <span class="font-bold">{{ project.title }}</span>, {{ formatter.convertDateToYear(project.date) }}
        </p>
      </nuxt-link>
    </div>

    <div v-else-if="error" class="text-red-500 text-center">
      <p>Error loading projects: {{ error.message }}</p>
    </div>

    <div v-else class="text-center text-gray-500">
      No projects found.
    </div>
  </NuxtLayout>
</template>
