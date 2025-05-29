import type { Work } from "~/types";

export default defineEventHandler(async (event): Promise<Work[]> => {
  const config = useRuntimeConfig(event);

  try {
    const res = await $fetch(`${config.apiUrl}/works?populate=photos`, {
      headers: {
        Authorization: `Bearer ${config.apiToken}`
      }
    });

    return (res as any).data.map((work: any) => ({
      id: work.id,
      slug: work.slug,
      createdAt: work.createdAt,
      updatedAt: work.updatedAt,
      publishedAt: work.publishedAt,
      title: work.title,
      description: work.description,
      date: work.date,
      size: work.size,
      material: work.material,
      photos: work.photos.map((photo: any) => ({
        id: photo.id,
        createdAt: photo.createdAt,
        updatedAt: photo.updatedAt,
        publishedAt: photo.publishedAt,
        name: photo.name,
        alt: photo.alt,
        caption: photo.caption,
        url: photo.url
      }))
    }));
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch proprerty data: ${(error as Error).message}`
    });
  }
});
