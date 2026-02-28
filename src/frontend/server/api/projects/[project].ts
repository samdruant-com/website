import type { Project } from "~/types";

export default defineEventHandler(async (event): Promise<Project> => {
  const config = useRuntimeConfig(event);

  try {
    const projectId = getRouterParam(event, "project");
    const res = await $fetch(
      `${config.apiUrl}/projects?filters[slug][$eq]=${projectId}&populate[works][populate][0]=photos`,
      {
        headers: {
          Authorization: `Bearer ${config.apiToken}`
        }
      }
    );

    if (Array.isArray((res as any).data) && (res as any).data.length <= 0) {
      throw new Error(`Project with slug "${projectId}" not found`);
    }

    const project = (res as any).data[0];

    return {
      id: project.id,
      slug: project.slug,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      publishedAt: project.publishedAt,
      title: project.title,
      description: project.description,
      date: project.date,
      works: project.works
        ? project.works?.map((work: any) => ({
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
            ? work.photos?.map((photo: any) => ({
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
