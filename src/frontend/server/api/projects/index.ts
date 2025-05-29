import type { Project } from "~/types";

export default defineEventHandler(async (event): Promise<Project[]> => {
  const config = useRuntimeConfig(event);

  try {
    const res = await $fetch(
      `${config.apiUrl}/projects?populate[works][populate][0]=photos`,
      {
        headers: {
          Authorization: `Bearer ${config.apiToken}`
        }
      }
    );

    return (res as any).data.map((project: any) => ({
      id: project.id,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      publishedAt: project.publishedAt,
      title: project.title,
      description: project.description,
      date: project.date,
      works: project.works.map((work: any) => ({
        id: work.id,
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
      }))
    }));
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch proprerty data: ${(error as Error).message}`
    });
  }
});
