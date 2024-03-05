<script setup lang="ts">
import type { Image, Work } from "~/types";

const props = defineProps({
  work: {
    type: Object as PropType<Work>,
  },
});

const emit = defineEmits(["created", "updated"]);

const workStore = useWorkStore();
const { notify } = useNotification();

const form = reactive<Partial<Work>>({
  name: props.work?.name || "",
  date: props.work?.date || "",
  size: props.work?.size || "",
  material: props.work?.material || "",
  images: props.work?.images || [],
  visible: props.work?.visible || false,
});

const files = ref<File[]>([]);

const validForm = computed<boolean>(() => {
  return form.name !== "" && form.date !== "" && form.images?.length !== 0;
});

const getFilePath = (file: File): string => {
  return URL.createObjectURL(file);
};

const post = async (): Promise<void> => {
  const images: Image[] = files.value.map((file, index) => {
    return {
      _id: "",
      src: "",
      place: `image-place-${index}`,
      photographer: `image-photograph-${index}`,
      file,
    };
  });

  try {
    const work = await workStore.postWork({ ...form, images });
    emit("created", work);
  } catch (error) {
    notify("Work Error", (error as Error).message, "error");
  }
};

const update = async (): Promise<void> => {
  try {
    if (!props.work) {
      throw new Error("Missing work id");
    }

    const images: Image[] = [
      ...files.value.map((file, index) => {
        return {
          _id: "",
          src: "",
          place: `image-place-${index}`,
          photographer: `image-photograph-${index}`,
          file,
        };
      }),
      ...(form.images as Image[]),
    ];

    const work = await workStore.updateWork(props.work!._id, {
      ...(form as Work),
      images,
    });
    emit("updated", work);
  } catch (error) {
    notify("Work Error", (error as Error).message, "error");
  }
};
</script>

<template>
  <base-card>
    <input-text v-model="form.name" label="name" />
    <input-text v-model="form.size" label="size" />
    <input-text v-model="form.material" label="material" />
    <input-date-time v-model="form.date" label="date" hide-time />

    <div class="form-control">
      <label class="label cursor-pointer">
        <span class="label-text">Visible</span>
        <input v-model="form.visible" type="checkbox" class="toggle" checked />
      </label>
      <span class="text-sm text-slate-600">unchecked works are only visible by website admin</span>
    </div>

    <InputFile v-model="files" label="Images" multiple />

    <div class="grid grid-cols-3 gap4">
      <base-card v-for="(file, index) in files" :key="index">
        <img :src="getFilePath(file)" width="100px" height="100px" />
        <p>Name: {{ file.name }}</p>
        <p>Type: {{ file.type }}</p>
        <p>Size: {{ file.size }}</p>
      </base-card>

      <base-card v-for="image in form.images" :key="image._id">
        <img :src="image.src" width="100px" height="100px" />
        <p>Photographer: {{ image.photographer }}</p>
        <p>Place: {{ image.place }}</p>
      </base-card>
    </div>

    <div class="flex flex-row gap-2">
      <base-btn v-if="!props.work" :disabled="!validForm" @click="post()">Upload</base-btn>
      <base-btn v-if="props.work" :disabled="!validForm" @click="update()">Update</base-btn>
      <base-btn v-if="props.work" class="bg-red-400">Delete</base-btn>
    </div>
  </base-card>
</template>
