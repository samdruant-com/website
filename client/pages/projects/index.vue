<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";
import { useProjectStore } from "~/stores/project-store";
import type { Project } from "~/types";

const authStore = useAuthStore();
const projectStore = useProjectStore();
const projects = ref<Project[]>([]);

onMounted(async () => {
  projects.value = await projectStore.indexProjects();

  const thumbnail = projects.value[0]?.works[0]?.images[0]?.src || undefined;
  useSeoSetup({ title: "Projects", image: thumbnail });
});
</script>

<template>
  <base-page title="Projects">
    <base-btn v-if="authStore.isAuthenticated" to="/projects/create">
      Create project
    </base-btn>
    <v-row justify="center" justify-sm="space-between">
      <v-col v-for="project in projects" :key="project._id" cols="12" md="5">
        <project-card :project="project" :admin="authStore.isAuthenticated" />
      </v-col>
    </v-row>
  </base-page>
</template>
