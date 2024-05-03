export default defineEventHandler(async (event) => {
  const { baseUrl } = useRuntimeConfig(event);
  const body = await readBody(event);
  const id = getRouterParam(event, 'id')

  const response = await fetch(`${baseUrl}/works/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body)
  });

  if (response.ok === false) {
    const message = await response.text();
    throw new Error(message);

    throw createError({
      statusCode: response.status,
      statusMessage: (await response.json()).message || `Failed to update work with id ${id}.`,
    })
  }

  return response.json();
})
