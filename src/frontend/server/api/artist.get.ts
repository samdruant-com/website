import type { Portfolio } from "~/types";

export default defineEventHandler(async (event): Promise<Portfolio> => {
  const config = useRuntimeConfig(event);

  try {
    const res = await $fetch(`${config.apiUrl}/artist?populate=photo`, {
      headers: {
        Authorization: `Bearer ${config.apiToken}`
      }
    });
    return {
      id: (res as any).data.id,
      createdAt: (res as any).data.createdAt,
      updatedAt: (res as any).data.updatedAt,
      publishedAt: (res as any).data.publishedAt,
      name: (res as any).data.name,
      description: (res as any).data.description,
      photo: {
        id: (res as any).data.photo.data.id,
        createdAt: (res as any).data.photo.data.createdAt,
        updatedAt: (res as any).data.photo.data.updatedAt,
        publishedAt: (res as any).data.photo.data.publishedAt,
        name: (res as any).data.photo.data.name,
        alt: (res as any).data.photo.data.alt,
        caption: (res as any).data.photo.data.caption,
        url: (res as any).data.photo.data.url
      }
    };
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch proprerty data: ${(error as Error).message}`
    });
  }
});
