import type { Work } from "~/types";

export default defineEventHandler(async (event): Promise<Work> => {
  const config = useRuntimeConfig(event);

  try {
    const workId = getRouterParam(event, "work");
    const res = await $fetch(`${config.apiUrl}/works?filters[slug][$eq]=${workId}&populate=photos`, {
      headers: {
        Authorization: `Bearer ${config.apiToken}`
      }
    });

    if (Array.isArray((res as any).data) && (res as any).data.length <= 0) {
      throw new Error(`Work with slug "${workId}" not found`);
    }

    const work = (res as any).data[0];

    return {
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
      photos: work.photos
        ? work.photos.map((photo: any) => ({
          id: photo.id,
          createdAt: photo.createdAt,
          updatedAt: photo.updatedAt,
          publishedAt: photo.publishedAt,
          name: photo.name,
          alt: photo.alt,
          caption: photo.caption,
          url: `${config.public.mediaUrl}${photo.url}`
        }))
        : []
    };
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch proprerty data: ${(error as Error).message}`
    });
  }
});
