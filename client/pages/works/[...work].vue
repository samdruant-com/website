<script setup lang="ts">
import { useWorkStore } from '~/stores/work-store';
import type { Work, Image } from '~/types';

const route = useRoute();
const workStore = useWorkStore();
const { notify } = useNotification();

const work = ref<Work>()

const getImageDetail = (image: Image): string => {
  const { place, photographer } = image;

  let detail = '';

  if(place && photographer){
    detail = `Photographed by ${photographer} at ${place}`
  } else if(place){
    detail = `Displayed at ${place}`
  } else if(photographer){
    detail = `Photographed by ${photographer}`
  }

  return detail;
}

onMounted(async () => {
  const id = route.params.work;

  try {
    if(!id){
      throw new Error('id is not defined')
    }

    work.value = await workStore.getWork(id as string);
  } catch (error) {
    console.log(error)
    notify('Work Error', (error as Error).message, 'error')
  }
})
</script>

<template>
  <base-page :title="work ? work.name : 'Work'">
  <v-row v-if="work" justify="center">
    <v-col v-for="image in work.images" cols="11" md="8">
      <base-image 
      :src="image.src"
      width="100%"
      height="auto"/>
      <p>{{ getImageDetail(image) }}</p>
    </v-col>
  </v-row>
  </base-page>
</template>