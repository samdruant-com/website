<script setup lang="ts">
import { useAuthStore } from "~/stores/auth.store";
import { useWorkStore } from "~/stores/work.store";
import type { Work } from "~/types";

useSeoSetup({ title: "Works" });

const authStore = useAuthStore();
const workStore = useWorkStore();

const works = ref<Work[]>([]);

onMounted(async () => {
  works.value = await workStore.indexWorks();
});
</script>

<template>
  <base-page title="Works">
    <base-btn v-if="authStore.isAuthenticated" color="primary" to="/works/create">
      Create work
    </base-btn>

    <div class="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="work in works" :key="work._id">
        <work-card :work="work" :admin="authStore.isAuthenticated" />
      </div>
    </div>
  </base-page>
</template>
