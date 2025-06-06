import type { Portfolio } from "~/types";
import { defineStore } from "pinia";

export const usePortfolioStore = defineStore("portfolio", () => {
  const portfolio = ref<Portfolio>({
    id: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    name: "Sam Druant",
    description: "Sam Druant (b. 1998, Antwerp, Belgium) holds a BA and MA in Textile Design from LUCA School of Arts Ghent and an MFA in Fine Arts from HDK-Valand University of Gothenburg, where she expanded her textile-based practice into a research-driven approach.",
    photo: {
      id: "contact",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      url: "/images/contact.webp",
      caption: "Contact"
    },
    featuredPhoto: {
      id: "contact",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      url: "/images/landing.webp",
      caption: "Landing Image"
    },
    links: [
      { name: "Instagram", url: "https://www.instagram.com/samdruant" },
      { name: "Email", url: "mailto:sam.druant@gmail.com" }
    ]
  });

  const getPortfolio = computed<Portfolio>(() => portfolio.value);

  const setPortfolio = (newPortfolio: Portfolio) => {
    portfolio.value = newPortfolio;
  };

  return { getPortfolio, setPortfolio };
});
