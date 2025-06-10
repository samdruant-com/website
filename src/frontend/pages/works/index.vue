<script setup lang="ts">
import type { Work } from "~/types";

const formatter = useFormatter();

useSeoSetup({ title: "Works" });

const scrollY = ref(0);
const pageLimit = 12; // Number of works to display per page
const currentPage = ref(1); // Current page number
const totalPages = ref(0); // Total number of pages
const works = ref<Work[]>([]);

const { data, error } = await useAsyncData("works", async () => {
  const res = await $fetch(`/api/works?page=0&limit=${pageLimit}`);

  if (res && res.works[0]?.photos[0]?.url) {
    useSeoSetup({ title: "Works", image: res.works[0]?.photos[0]?.url });
  }

  return {
    works: res.works as Work[],
    currentPage: res.currentPage,
    totalPages: res.totalPages
  };
});

works.value = data.value?.works || [];
currentPage.value = data.value?.currentPage || 1;
totalPages.value = data.value?.totalPages || 0;

const getSortedWorks = computed(() => {
  if (!data.value || error.value) {
    return [];
  }

  return formatter.sortListByDate(works.value) as Work[];
});

// returns true if the user has scrolled to the bottom of the page
const isRockBottom = computed<boolean>(() => {
  // skip for SSR
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

async function loadMoreWorks() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    const res = await $fetch(`/api/works?page=${currentPage.value}&limit=${pageLimit}`);
    works.value.push(...(res.works as Work[]));
  }
}

watch(isRockBottom, async (rockBottom) => {
  if (rockBottom === true) {
    await loadMoreWorks();
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
  <NuxtLayout name="page" title="Works">
    <div v-if="getSortedWorks.length > 0" class="flex flex-col md:grid md:grid-cols-3 gap-4">
      <work-card
        v-for="work in getSortedWorks"
        :key="work.id"
        :work="work"
        :minimal="true"
      />
    </div>

    <div v-else-if="error" class="text-red-500 text-center">
      <p>Error loading works: {{ error.message }}</p>
    </div>

    <div v-else class="text-center text-gray-500">
      No works found.
    </div>
  </NuxtLayout>
</template>
