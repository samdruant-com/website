<script setup lang="ts">
import { useWorkStore } from '~/stores/work-store'
import type { Work, Image } from '~/types';

const props = defineProps({
	editMode: {
    type: Boolean,
    default: false
  }
});

const workStore = useWorkStore();

const form = reactive<Partial<Work>>({
  name: '',
  date: '',
  size: '',
  material: '',
  images: []
})

const files = ref<File[]>([])

const getFilePath = (file: File): string => {
  return URL.createObjectURL(file);
}

const post = async (): Promise<void> => {
  const work: Work = {...form as Work}
  
  files.value.forEach((file, index) => {
    work.images?.push({src: '', place: `image-place-${index}`, photographer: `image-photograph-${index}`, file})
  })

  await workStore.postWork(work)
}
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

    <v-divider class="border-opacity-25" />

    <BaseBtn color="primary" block @click="post()">{{ props.editMode ? 'Update' : 'Upload' }}</BaseBtn>
  </BaseCard>
</template>