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
  images: [...props.work?.images || []],
  visible: props.work?.visible || true,
});

const newImages = ref<Image[]>([]);

const validForm = computed<boolean>(() => {
  return (
    form.name !== "" &&
    form.date !== "" &&
    (form.images?.length !== 0 || newImages.value.length !== 0)
  );
});

const getFilePath = (file: File): string => {
  return URL.createObjectURL(file);
};

const handleNewFiles = (files: File[]): void => {
  // convert files to images
  const processedFiles: Image[] = files.map((file) => ({ _id: "", src: getFilePath(file), caption: "", file }));

  // add file images to newImages array
  newImages.value.push(...processedFiles);
};

const handleChangedCaption = (config: { caption: string, id: string, new: boolean }): void => {
  let image: Image | undefined;

  if (config.new) {
    image = newImages.value.find((image) => image.file!.name === config.id);
  } else {
    image = form.images?.find((image) => image._id === config.id);
  }

  if (image) {
    image.caption = config.caption;
  }
};

const post = async (): Promise<void> => {

  try {
    const work = await workStore.postWork({ ...form, images: newImages.value });
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

    const work = await workStore.updateWork(props.work!._id, {
      ...(form as Work),
      images: [...form.images || [], ...newImages.value]
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

    <label class="mt-2 flex flex-col">
      <span class="label-text">Visible</span>
      <div class="mt-2 flex justify-between">
        <span class="w-4/6 text-sm text-slate-700">unchecked works are only visible by website admin</span>
        <input v-model="form.visible" type="checkbox" class="toggle toggle-success" checked />
      </div>
    </label>

    <div class="flex flex-col gap-2 my-4 p-2 bg-slate-100">
      <input-file label="Images" multiple class="col-span-3" @update:model-value="handleNewFiles" />

      <div class="w-full flex flex-col md:flex-row gap-2">
        <image-card v-for="(image, index) in newImages" :key="index" class="w-full"
          :image="{ ...image, src: getFilePath(image.file!) }" admin-mode
          @caption="(caption) => handleChangedCaption({ caption, id: image.file!.name, new: true })" />
        <image-card v-for="image in form.images" :key="image._id" class="w-full" :image="image" admin-mode
          @caption="(caption) => handleChangedCaption({ caption, id: image._id, new: false })" />
      </div>
    </div>

    <div class="flex flex-row gap-2 pt-2" style="border-top: 3px solid;">
      <base-btn v-if="!props.work" :disabled="!validForm" @click="post()">Upload</base-btn>
      <base-btn v-if="props.work" :disabled="!validForm" @click="update()">Update</base-btn>
      <base-btn v-if="props.work" class="bg-red-400">Delete</base-btn>
    </div>
  </base-card>
</template>
