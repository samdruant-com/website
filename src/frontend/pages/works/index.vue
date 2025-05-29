<script setup lang="ts">
import type { Work } from "~/types";
import { useAuthStore } from "~/stores/auth.store";
import { useWorkStore } from "~/stores/work.store";

useSeoSetup({ title: "Works" });

const authStore = useAuthStore();
const workStore = useWorkStore();

const works = ref<Work[]>([]);

const getSortedWorks = computed(() =>
// sort works by date (unix timestamp) latest first
  [...works.value].sort((a: Work, b: Work) => Number(b.date) - Number(a.date))
);

onMounted(async () => {
  works.value = await workStore.indexWorks();
});
</script>

<template>
  <base-page title="Works">
    <div v-if="authStore.isAuthenticated" class="mt-2 mb-4">
      <base-btn color="primary" to="/works/create">
        Create work
      </base-btn>
    </div>

    <div class="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="work in getSortedWorks" :key="work._id">
        <work-card :work="work" :admin="authStore.isAuthenticated" />
      </div>
    </div>
  </base-page>
</template>
