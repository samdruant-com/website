export default defineEventHandler(async (event) => {
  const { baseUrl } = useRuntimeConfig(event);
  const body = await readBody(event);
  const id = getRouterParam(event, 'id')

  const response = await fetch(`${baseUrl}/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body)
  });

  if (response.ok === false) {
    throw new Error('Invalid tokens.');
  }

  return response.json();
})
