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

    <v-row>
      <v-col v-for="work in works" cols="12" md="4">
        <work-card :work="work" :admin="authStore.isAuthenticated" />
      </v-col>
    </v-row>
  </base-page>
</template>
~/stores/auth.store~/stores/work.store