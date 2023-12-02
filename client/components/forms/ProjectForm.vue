<script setup lang="ts">
import { useProjectStore } from "~/stores/project-store";
import { useWorkStore } from "~/stores/work-store";
import type { SpecialProject, Project, Work } from "~/types";

const projectStore = useProjectStore();
const workStore = useWorkStore();

const props = defineProps({
  project: {
    type: Object as PropType<Project>,
  },
});

const emits = defineEmits(["created", "updated"]);

const form = reactive<Partial<SpecialProject>>({
  name: props.project?.name || "",
  date: props.project?.date || "",
  works: props.project?.works.map((work) => work._id) || [],
  visible: props.project?.visible || false
});

const availableWorks = ref<Work[]>([]);

const post = async (): Promise<void> => {
  const project = await projectStore.postProject(form);
  emits("created", project);
};

const patch = async (): Promise<void> => {
  if (!props.project) {
    throw new Error("Cannot patch without a project.");
  }

  const project = await projectStore.patchProject(props.project?._id, form);
  emits("updated", project);
};

const isSelectedWorkId = (id: string): boolean => {
  return (
    form.works?.find((selectedId: string) => id === selectedId) !== undefined
  );
};

const selectWorkId = (id: string): void => {
  // skip if id is a duplicate
  if (isSelectedWorkId(id)) {
    return;
  }

  form.works?.push(id);
};

const unselectWorkId = (id: string): void => {
  form.works = form.works?.filter((selectedId) => selectedId !== id);
};

const getWorkThumbnail = (work: Work): string => {
  return work.images[0].src;
};

onMounted(async () => {
  availableWorks.value = await workStore.indexWorks();
});
</script>

<template>
  <BaseCard>
    <InputText v-model="form.name" label="name" />
    <InputDateTime v-model="form.date" label="date" hide-time />
    <v-checkbox v-model="form.visible" label="visible" hint="unchecked project are only visible by website admin" />

    <v-divider class="border-opacity-25 mb-2" />
    <v-row>
      <v-col v-for="work in availableWorks" :key="work._id" cols="12" md="4">
        <base-card outlined>
          <base-image :src="getWorkThumbnail(work)" width="100%" height="auto" />
          <p class="my-1">{{ work.name }}</p>

          <base-btn v-if="isSelectedWorkId(work._id)" color="warning" small
            @click="unselectWorkId(work._id)">Unselect</base-btn>
          <base-btn v-else color="success" small @click="selectWorkId(work._id)">Select</base-btn>
        </base-card>
      </v-col>
    </v-row>

    <v-divider class="border-opacity-25 mb-2" />

    <BaseBtn v-if="!props.project" color="primary" block @click="post()">Upload</BaseBtn>
    <BaseBtn v-if="props.project" color="primary" block @click="patch()">Update</BaseBtn>
    <BaseBtn v-if="props.project" color="error" block>Delete</BaseBtn>
  </BaseCard>
</template>
