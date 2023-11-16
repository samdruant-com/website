import { defineStore } from 'pinia'
import type { Work, Image } from '~/types'

export const useWorkStore = defineStore('work', () => {
  //const runtimeConfig = useRuntimeConfig();
  const BASE_URL = "http://localhost:3001/api"//runtimeConfig.apiUrl;

  /**
   * Package new images (file property) and include existing images (src property)
   * in the form data.
   * 
   * New images are stored such that each image, based on its index, has three
   * properties:
   * - image-0-file - the image file
   * - image-0-photographer - the photographer of the image
   * - image-0-place - the place where the image was taken
   * 
   * Existing images are stored such that each image, based on its index, has three
   * properties:
   * - image-0-src - the image src
   * - image-0-photographer - the photographer of the image
   * - image-0-place - the place where the image was taken
   */
  const _prepareImages = (form: FormData, images: Image[]): FormData => {
    images.forEach((image: Image, index: number) => {
      if(image.file){
        form.append(`image-${index}-file`, image.file)
        form.append(`image-${index}-photographer`, image.photographer)
        form.append(`image-${index}-place`, image.place)
      } else {
        form.append(`image-${index}-src`, image.src)
        form.append(`image-${index}-photographer`, image.photographer)
        form.append(`image-${index}-place`, image.place)
      }
    });

    return form;
  }

  const postWork = async (work: Work): Promise<Work> => {
    
    let newWork: Work | undefined;

    try {
      let form = new FormData();
      form.append('name', work.name)
      form.append('size', work.size)
      form.append('date', work.date)
      form.append('material', work.material)

      // process images
      form = _prepareImages(form, work.images);

      const { data, error, status } = await useFetch(BASE_URL + '/works', { 
        method: "post",
        body: form
      })

      if(error){
        throw error;
      }

      if(!data){
        throw new Error('No data returned')
      }

      newWork = data as unknown as Work;
    } catch (error) {
      console.log({ error })
    }

    return newWork as Work;
  }

  return { postWork }
})
