<script setup lang="ts">
import type { Image, Project } from "~/types";

const formatter = useFormatter();

const scrollY = ref(0);
const pageLimit = 12; // Number of projects to display per page
const currentPage = ref(1); // Current page number
const totalPages = ref(0); // Total number of pages
const projects = ref<Project[]>([]);

const { data, error } = await useAsyncData("projects", async () => {
  const res = await $fetch(`/api/projects?page=1&limit=${pageLimit}`);

  if (res && res.projects[0]?.works[0]?.photos[0]?.url) {
    useSeoSetup({ title: "Projects", image: res.projects[0]?.works[0]?.photos[0]?.url });
  }

  return {
    projects: res.projects as Project[],
    currentPage: res.currentPage,
    totalPages: res.totalPages
  };
});

projects.value = data.value?.projects || [];
currentPage.value = data.value?.currentPage || 1;
totalPages.value = data.value?.totalPages || 0;

const getSortedProjects = computed(() => {
  if (!data.value || error.value) {
    return [];
  }

  // sort works by date (unix timestamp) latest first
  return formatter.sortListByDate(projects.value) as Project[];
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

// returns true if the user has scrolled to the bottom of the page
const isRockBottom = computed<boolean>(() => {
  if (import.meta.env.SSR) {
    return false;
  }
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  return scrollY.value + windowHeight >= documentHeight - 100;
});

function updateScroll() {
  scrollY.value = window.scrollY;
};

async function loadMoreProjects() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    const res = await $fetch(`/api/projects?page=${currentPage.value}&limit=${pageLimit}`);
    projects.value.push(...(res.projects as Project[]));
  }
}

watch(isRockBottom, async (rockBottom) => {
  if (rockBottom === true) {
    await loadMoreProjects();
  }
});

onMounted(() => {
  window.addEventListener("scroll", updateScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateScroll);
});
</script>

<template>
  <NuxtLayout name="page" title="Projects">
    <div v-if="getSortedProjects.length > 0" class="flex flex-col md:grid md:grid-cols-3 gap-4">
      <nuxt-link
        v-for="project in getSortedProjects"
        :key="project.id"
        class="flex flex-col"
        :to="`/projects/${project.slug}`"
      >
        <img
          :src="getThumbnail(project).url"
          :alt="getThumbnail(project).caption"
          class="h-full w-full object-cover"
        >

        <p class="h-12 mt-2">
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
