import { usePortfolioStore } from "~/stores/portfolio.store";

const useSeoSetup = (config?: { title?: string; description?: string, image?: string}) => {

  const portfolioStore = usePortfolioStore();

  const defaultImage = 'http://sam.oliverrr.net/images/landing.webp';

  const seoImage = config?.image || defaultImage;
  const seoTitle = config?.title ? `${config?.title } - ${portfolioStore.portfolio.name || 'Portfolio'}` : portfolioStore.portfolio.name || 'Portfolio';
  const seoDescription = config?.description || 'Artist from Antwerp, Belgium currently doing an MFA fine arts at Hdk-Valand Gothenburg, Sweden';
  
  useHead({
    title: seoTitle,
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