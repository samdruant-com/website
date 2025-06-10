<script setup lang="ts">
import type { Work } from "~/types";
import { useProjectStore } from "~/stores/project.store";

const projectStore = useProjectStore();
const route = useRoute();
const formatter = useFormatter();

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
  const year = data.value?.date
    ? formatter.convertDateToYear(data.value?.date)
    : "N/a";

  return `${name}, ${year}`;
});

const getProjectWorks = computed<Work[]>(() => {
  return data.value?.works
    ? formatter.sortListByDate(data.value.works) as Work[]
    : [];
});
</script>

<template>
  <NuxtLayout name="page" :title="getProjectTitle">
    <div v-if="data" class="flex flex-col items-center md:flex-row md:justify-between gap-4">
      <div
        v-if="data?.description"
        id="work-details"
        class="w-full my-4 md:my-0 md:self-start md:basis-1/3 md:sticky md:top-16"
        v-html="formatter.convertMarkdownToHtml(data.description)"
      />

      <div id="works" class="flex flex-col items-center gap-4 md:basis-2/3 md:max-w-2xl">
        <div v-for="work in getProjectWorks" :key="work.id" class="md:h-[70vh] md:w-full">
          <work-card :work="work" />
        </div>
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
