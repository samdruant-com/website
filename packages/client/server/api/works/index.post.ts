export default defineEventHandler(async (event) => {
  const { baseUrl } = useRuntimeConfig(event);
  const body = await readBody(event);

  const response = await fetch(`${baseUrl}/works`, {
    method: 'POST',
    body: JSON.stringify(body)
  });

  if (response.ok === false) {
    throw createError({
      statusCode: response.status,
      statusMessage: (await response.json()).message || `Failed to create work.`,
    })
  }

  return response.json();
})
