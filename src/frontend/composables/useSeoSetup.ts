import { usePortfolioStore } from "~/stores/portfolio.store";

function useSeoSetup(config?: { title?: string, description?: string, image?: string }) {
  const portfolioStore = usePortfolioStore();

  const seoImage = config?.image || "/images/landing.webp";
  const seoTitle = config?.title ? `${config?.title} - ${portfolioStore.getPortfolio.name || "Portfolio"}` : portfolioStore.getPortfolio.name || "Portfolio";
  const seoDescription = config?.description || "Sam Druant (b. 1998, Antwerp, Belgium) is an artist with a textile-based practice and research-driven approach.";

  useHead({
    title: seoTitle,
    meta: [
      {
        name: "author",
        content: "@samdruant"
      },
      {
        name: "description",
        content: seoDescription
      }
    ]
  });

  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogDescription: seoDescription,
    ogTitle: seoTitle,
    ogImage: seoImage,
    ogImageHeight: "882",
    ogImageWidth: "1686",
    twitterCard: "summary_large_image",
    twitterImage: seoImage,
    twitterTitle: seoTitle,
    twitterDescription: seoDescription
  });
}

export { useSeoSetup };
