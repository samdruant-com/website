import { defineStore } from 'pinia';
import { useAuthStore } from '~/stores/auth.store';
import type { Work, Image } from '~/types';

export const useWorkStore = defineStore('work', () => {

  const { request } = useRequest();
  const authStore = useAuthStore();

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

  const prepareForm = (work: Partial<Work>): FormData => {
    let form = new FormData();
    
    if(work.name) form.append('name', work.name)
    if(work.size) form.append('size', work.size)
    if(work.date) form.append('date', work.date)
    if(work.material) form.append('material', work.material)
    if(work.visible !== undefined) form.append('visible', work.visible.toString())

    // process images
    if(work.images) form = _prepareImages(form, work.images);

    return form;
  }

  const postWork = async (work: Partial<Work>): Promise<Work> => {
    
    let form = prepareForm(work);

    const data = await request('/works', {
      body: form,
      method: 'POST',
      contentType: null,
      authorization: authStore.accessToken
    });

    return data as unknown as Work;
  }

  const indexWorks = async (): Promise<Work[]> => {
    const data = await request('/works', { authorization: authStore.accessToken });
    return data as unknown as Work[];
  }

  const getWork = async (id: string): Promise<Work> => {
    const data = await request(`/works/${id}`, { authorization: authStore.accessToken });
    return data as unknown as Work;
  }

  const updateWork = async (id: string, work: Partial<Work>): Promise<Work> => {
    let form = prepareForm(work);

    const data = await request(`/works/${id}`, {
      body: form,
      method: 'PATCH',
      contentType: null,
      authorization: authStore.accessToken
    });

    return data as unknown as Work;
  }

  return { postWork, indexWorks, getWork, updateWork }
})
