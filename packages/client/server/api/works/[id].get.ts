export default defineEventHandler(async (event) => {
  const { baseUrl } = useRuntimeConfig(event);
  const id = getRouterParam(event, 'id')

  const response = await fetch(`${baseUrl}/works/${id}`, {
    method: 'GET'
  });

  if (response.ok === false) {
    
    throw createError({
      statusCode: response.status,
      statusMessage: (await response.json()).message || `Failed to get work with id ${id}.`,
    })
  }

  return response.json();
})
