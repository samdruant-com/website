<script setup lang="ts">
import { useProjectStore } from "~/stores/project.store";
import type { Project } from "~/types";

const route = useRoute();
const projectStore = useProjectStore();
const { notify } = useNotification();

const project = ref<Project>();

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
  <base-page :title="project?.name">
    <v-row>
      <v-col v-for="work in project?.works" :key="work._id" cols="12" md="6" lg="4">
        <work-card :work="work" />
      </v-col>
    </v-row>
  </base-page>
</template>
~/stores/project.store