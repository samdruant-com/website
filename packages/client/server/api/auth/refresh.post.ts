export default defineEventHandler(async (event) => {
  const { baseUrl } = useRuntimeConfig(event);
  const body = await readBody(event);
  
  const response = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(body)
  });

  if (response.ok === false) {
    throw createError({
      statusCode: response.status,
      statusMessage: (await response.json()).message || 'Invalid tokens.',
    })
  }

  return response.json();
})