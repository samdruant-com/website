<script setup lang="ts">
import type { Work } from "~/types";

const route = useRoute();
const formatter = useFormatter();

const { data, error } = await useAsyncData("project", async () => {
  const id = route.params.project;

  if (!id) {
    throw new Error("Project ID is not defined");
  }

  const project = await $fetch(`/api/projects/${id}`);

  if (project.works[0]?.photos[0]?.url) {
    useSeoSetup({ title: project.title, image: project.works[0]?.photos[0]?.url });
  }

  return project;
});

const getProjectTitle = computed<string>(() => {
  const name = data.value?.title || "N/a";
  const year = data.value?.date
    ? formatter.convertDateToYear(data.value?.date)
    : "N/a";

  return `${name}, ${year}`;
});

const getProjectDescription = computed<string | undefined>(() => {
  return data.value?.description
    ? formatter.convertMarkdownToHtml(data.value.description)
    : undefined;
});

const getProjectWorks = computed<Work[]>(() => {
  return data.value?.works
    ? formatter.sortListByDate(data.value.works) as Work[]
    : [];
});

const isMobile = computed<boolean>(() => {
  if (import.meta.server) {
    return false; // Server-side rendering, assume not mobile
  }

  return window.innerWidth < 768; // Adjust the breakpoint as needed
});
</script>

<template>
  <NuxtLayout name="page" :title="getProjectTitle">
    <div v-if="data" class="flex flex-col items-center md:flex-row md:justify-between gap-2 md:gap-x-2 md:gap-y-4">
      <div
        id="project-details"
        class="w-full my-2 md:my-0 md:self-start md:basis-4/12 md:sticky md:top-16 md:max-h-[80vh] md:overflow-y-auto scrollbar-thin scrollbar-thumb-transparent scrollbar-track-transparent"
        style="scrollbar-width: thin; scrollbar-color: transparent transparent;"
      >
        <div
          v-if="getProjectDescription"
          class="w-full"
          v-html="formatter.convertMarkdownToHtml(getProjectDescription)"
        />
      </div>

      <div id="project-works" class="flex flex-col items-center gap-4 md:grow md:max-w-2xl">
        <work-card
          v-for="work in getProjectWorks"
          :key="work.id"
          :work="work"
          :rotate-caption="!isMobile"
          class="md:w-8/12"
        />
      </div>
    </div>
    <div v-else-if="error" class="text-red-500">
      <p>Error loading project: {{ error.message }}</p>
    </div>
    <div v-else class="text-gray-500">
      <p>No project found.</p>
    </div>
  </NuxtLayout>
</template>
