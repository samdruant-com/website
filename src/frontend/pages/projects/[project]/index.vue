<script setup lang="ts">
import type { Project } from "~/types";
import { useProjectStore } from "~/stores/project.store";

const projectStore = useProjectStore();
const route = useRoute();
const { notify } = useNotification();
const { convertUnixToDateTime } = useDate();

const project = ref<Project>();

const getTitle = computed<string>(() => {
  const name = project.value?.name || "N/a";
  const year = convertUnixToDateTime(Number(project.value?.date)).date.split("-")[0] || "N/a";

  return `${name}, ${year}`;
});

onMounted(async () => {
  const id = route.params.project;

  try {
    if (!id) {
      throw new Error("Missing project id");
    }

    project.value = await projectStore.getProject(id as string);

    const thumbnail = project.value.works[0]?.images[0]?.src || undefined;
    useSeoSetup({ title: project.value.name, image: thumbnail });
  } catch (error) {
    notify("Project Error", (error as Error).message, "error");
  }
});
</script>

<template>
  <base-page :title="getTitle">
    <div class="flex flex-col md:grid md:grid-cols-2 gap-4">
      <div v-for="work in project?.works" :key="work._id">
        <work-card :work="work" />
      </div>
    </div>
  </base-page>
</template>
