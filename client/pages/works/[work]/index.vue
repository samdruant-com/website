<script setup lang="ts">
import { useAuthStore } from "~/stores/auth-store";
import { useWorkStore } from "~/stores/work-store";
import type { Work } from "~/types";

const route = useRoute();
const authStore = useAuthStore();
const workStore = useWorkStore();
const { notify } = useNotification();

const work = ref<Work>();

onMounted(async () => {
  const id = route.params.work;

  try {
    if (!id) {
      throw new Error("id is not defined");
    }

    work.value = await workStore.getWork(id as string);

    const thumbnail = work.value.images[0]?.src || undefined;
    useSeoSetup({ title: work.value.name, image: thumbnail });
  } catch (error) {
    console.log(error);
    notify("Work Error", (error as Error).message, "error");
  }
});
</script>

<template>
  <base-page :title="work ? work.name : 'Work'">
    <v-row v-if="work" justify="center">
      <v-col v-for="image in work.images" cols="11" md="8">
        <work-card :work="work" :admin="authStore.isAuthenticated" />
      </v-col>
    </v-row>
  </base-page>
</template>
