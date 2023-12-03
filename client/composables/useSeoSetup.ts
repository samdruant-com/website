const useSeoSetup = (config?: { title?: string; description?: string, image?: string}) => {

  const seoImage = config?.image || '/images/contact.jpg';
  const seoTitle = config?.title || 'Portoflio';
  const seoDescription = config?.description || 'Sam Druant is an artist from Antwerp, Belgium currently doing an MFA fine arts at Hdk-Valand Gothenburg, Sweden';
  
  useHead({
    title: seoTitle,
    titleTemplate: (title?: string | undefined) =>
      `${title} | ${seoDescription}`,
    meta: [
      {
        name: 'author',
        content: '@samdruant'
      },
      {
        name: 'description',
        content: seoDescription
      }
    ]
  })
  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogDescription: seoDescription,
    ogTitle: seoTitle,
    ogImage: seoImage,
    ogImageHeight: '882',
    ogImageWidth: '1686',
    twitterCard: 'summary_large_image',
    twitterImage: seoImage,
    twitterTitle: seoTitle,
    twitterDescription: seoDescription
  })
}

export {useSeoSetup}