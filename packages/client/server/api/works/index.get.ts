export default defineEventHandler(async (event) => {
  const { baseUrl } = useRuntimeConfig(event);
  
  const response = await fetch(`${baseUrl}/works`, {
    method: 'GET'
  });

  if (response.ok === false) {
    throw createError({
      statusCode: response.status,
      statusMessage: (await response.json()).message || `Failed to get works.`,
    })
  }

  return response.json();
})
