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
});

const files = ref<File[]>([]);

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
    const work = await workStore.postWork({ ...(form as Work), images });
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
  <BaseCard>
    <InputText v-model="form.name" label="name" />
    <InputText v-model="form.size" label="size" />
    <InputText v-model="form.material" label="material" />
    <InputDateTime v-model="form.date" label="date" hide-time />
    <InputFile v-model="files" label="Images" multiple />

    <BaseCard v-for="(file, index) in files" :key="index">
      <BaseImage :src="getFilePath(file)" width="100px" height="100px" crop />
      <p>Name: {{ file.name }}</p>
      <p>Type: {{ file.type }}</p>
      <p>Size: {{ file.size }}</p>
    </BaseCard>
    <BaseCard v-for="image in form.images" :key="image._id">
      <BaseImage :src="image.src" width="100px" height="100px" crop />
      <p>Photographer: {{ image.photographer }}</p>
      <p>Place: {{ image.place }}</p>
    </BaseCard>

    <v-divider class="border-opacity-25" />

    <BaseBtn v-if="!props.work" color="primary" block @click="post()">Upload</BaseBtn>
    <BaseBtn v-if="props.work" color="primary" block @click="update()">Update</BaseBtn>
    <BaseBtn v-if="props.work" color="error" block>Delete</BaseBtn>
  </BaseCard>
</template>
