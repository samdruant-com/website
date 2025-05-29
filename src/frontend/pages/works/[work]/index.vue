<script setup lang="ts">
import type { Work } from "~/types";
import { useWorkStore } from "~/stores/work.store";

const workStore = useWorkStore();

const route = useRoute();
const { notify } = useNotification();
const { convertUnixToDateTime } = useDate();

const work = ref<Work>();

const getTitle = computed<string>(() => {
  const name = work.value?.name || "N/a";
  const year = convertUnixToDateTime(Number(work.value?.date)).date.split("-")[0] || "N/a";

  return `${name}, ${year}`;
});

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
    console.error(error);
    notify("Work Error", (error as Error).message, "error");
  }
});
</script>

<template>
  <base-page :title="getTitle">
    <div v-if="work" class="flex flex-col gap-4">
      <div v-for="image in work.images" :key="image._id">
        <image-card :image="image" :expand="true" />
      </div>
    </div>
  </base-page>
</template>
