import type { Portfolio } from "~/types";

export default defineEventHandler(async (event): Promise<Portfolio[]> => {
  const config = useRuntimeConfig(event);

  try {
    const res = await $fetch(`${config.apiUrl}/artist?populate=profile_photo&populate=featured_photo&populate=links`, {
      headers: {
        Authorization: `Bearer ${config.apiToken}`
      }
    });

    const artist = (res as any).data;

    return [{
      id: artist.id,
      createdAt: artist.createdAt,
      updatedAt: artist.updatedAt,
      publishedAt: artist.publishedAt,
      name: artist.name,
      description: artist.description,
      photo: {
        id: artist.profile_photo.id,
        createdAt: artist.profile_photo.createdAt,
        updatedAt: artist.profile_photo.updatedAt,
        publishedAt: artist.profile_photo.publishedAt,
        name: artist.profile_photo.name,
        alt: artist.profile_photo.alt,
        caption: artist.profile_photo.caption,
        url: `${config.public.mediaUrl}${artist.profile_photo.url}`
      },
      featuredPhoto: {
        id: artist.featured_photo.id,
        createdAt: artist.featured_photo.createdAt,
        updatedAt: artist.featured_photo.updatedAt,
        publishedAt: artist.featured_photo.publishedAt,
        name: artist.featured_photo.name,
        alt: artist.featured_photo.alt,
        caption: artist.featured_photo.caption,
        url: `${config.public.mediaUrl}${artist.featured_photo.url}`
      },
      links: Object.entries(artist.links)
        .map(([key, link]) => ({
          name: key,
          url: link && key.toLowerCase() === "email" ? `mailto:${link}` : link as string
        }))
        .filter(link => link.url && typeof link.url === "string" && link.url.trim() !== "")
    }];
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Failed to fetch proprerty data: ${(error as Error).message}`
    });
  }
});
