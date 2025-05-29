<script setup lang="ts">
import type { Image, Project, SpecialProject, Work } from "~/types";
import { useProjectStore } from "~/stores/project.store";
import { useWorkStore } from "~/stores/work.store";

const props = defineProps({
  project: {
    type: Object as PropType<Project>
  }
});
const emits = defineEmits(["created", "updated", "deleted"]);
const projectStore = useProjectStore();
const workStore = useWorkStore();

const form = reactive<Partial<SpecialProject>>({
  name: props.project?.name || "",
  date: props.project?.date || "",
  works: props.project?.works.map(work => work._id) || [],
  visible: props.project?.visible || true
});

const availableWorks = ref<Work[]>([]);

const validForm = computed<boolean>(() => {
  return form.name !== "" && form.date !== "" && form.works?.length !== 0;
});

async function postProject(): Promise<void> {
  const project = await projectStore.postProject(form);
  emits("created", project);
}

async function patchProject(): Promise<void> {
  if (!props.project) {
    throw new Error("Cannot patch without a project.");
  }

  const project = await projectStore.patchProject(props.project?._id, form);
  emits("updated", project);
}

async function deleteProject(): Promise<void> {
  if (!props.project) {
    throw new Error("Cannot delete without a project.");
  }

  const project = await projectStore.deleteProject(props.project?._id);
  emits("deleted", project);
}

function isSelectedWorkId(id: string): boolean {
  return (
    form.works?.find((selectedId: string) => id === selectedId) !== undefined
  );
}

function selectWorkId(id: string): void {
  // skip if id is a duplicate
  if (isSelectedWorkId(id)) {
    return;
  }

  form.works?.push(id);
}

function unselectWorkId(id: string): void {
  form.works = form.works?.filter(selectedId => selectedId !== id);
}

function getWorkThumbnail(work: Work): Image {
  return work.images[0];
}

onMounted(async () => {
  availableWorks.value = await workStore.indexWorks();
});
</script>

<template>
  <BaseCard>
    <InputText v-model="form.name" label="Name" />
    <InputDateTime v-model="form.date" label="date" hide-time />

    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">Visible</span>
        <input
          v-model="form.visible"
          type="checkbox"
          class="toggle toggle-success"
          checked
        >
      </label>
      <span class="text-sm text-slate-600">unchecked project are only visible by website admin</span>
    </div>

    <div class="grid md:grid-cols-4 gap-4 my-2">
      <div
        v-for="work in availableWorks"
        :key="work._id"
        cols="12"
        md="4"
      >
        <base-card outlined>
          <image-card :image="getWorkThumbnail(work)" hide-details />
          <p class="my-1">
            {{ work.name }}
          </p>

          <base-btn
            v-if="isSelectedWorkId(work._id)"
            class="bg-amber-300"
            small
            @click="unselectWorkId(work._id)"
          >
            Unselect
          </base-btn>
          <base-btn
            v-else
            class="bg-green-300"
            small
            @click="selectWorkId(work._id)"
          >
            Select
          </base-btn>
        </base-card>
      </div>
    </div>

    <div class="flex flex-row gap-2 pt-2" style="border-top: 3px solid">
      <base-btn
        v-if="!props.project"
        :disabled="!validForm"
        @click="postProject()"
      >
        Upload
      </base-btn>
      <base-btn
        v-if="props.project"
        :disabled="!validForm"
        @click="patchProject()"
      >
        Update
      </base-btn>
      <base-btn
        v-if="props.project"
        class="bg-red-400"
        @click="deleteProject()"
      >
        Delete
      </base-btn>
    </div>
  </BaseCard>
</template>
