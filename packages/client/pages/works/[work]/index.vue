<script setup lang="ts">
import { useWorkStore } from "~/stores/work.store";
import type { Work } from "~/types";

const route = useRoute();
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
      <v-col v-for="image in work.images" :key="image._id" cols="12" md="10">
        <image-card :image="image" />
      </v-col>
    </v-row>
  </base-page>
</template>
~/stores/work.store