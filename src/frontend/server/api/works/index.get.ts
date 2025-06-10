import type { Work } from "~/types";

export default defineEventHandler(async (event): Promise<{ works: Work[], currentPage: number, totalPages: number }> => {
  const config = useRuntimeConfig(event);

  const query = getQuery(event);
  const page: number = Number(query.page) || 0;
  const limit: number = Number(query.limit) || 12;

  const list: unknown[] = [];
  let currentPage: number = 0;
  let totalPages: number = 0;

  try {
    const res = await $fetch(
      `${config.apiUrl}/works?populate=photos&pagination[page]=${page}&pagination[pageSize]=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${config.apiToken}`
        }
      }
    );

    if (res && Array.isArray((res as any).data)) {
      list.push(...(res as any).data);
    }

    currentPage = (res as any).meta.pagination.page;
    totalPages = (res as any).meta.pagination.pageCount;
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch proprerty data: ${(error as Error).message}`
    });
  }

  const works: Work[] = list.map((work: any) => ({
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
      url: `${config.public.mediaUrl}${photo.url}`
    }))
  }));

  return {
    works,
    currentPage,
    totalPages
  };
});
