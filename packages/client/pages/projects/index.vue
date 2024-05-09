<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useProjectStore } from "~/stores/project.store";
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
    <div v-if="authStore.isAuthenticated" class="mt-2 mb-4">
      <base-btn color="primary" to="/projects/create">
        Create project
      </base-btn>
    </div>

    <div class="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="project in projects" :key="project._id">
        <project-card :project="project" :admin="authStore.isAuthenticated" />
      </div>
    </div>
  </base-page>
</template>
