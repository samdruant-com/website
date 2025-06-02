import type { Portfolio } from "~/types";
import { defineStore } from "pinia";

export const usePortfolioStore = defineStore("portfolio", () => {
  const portfolio = ref<Portfolio>({
    id: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    name: "Sam Druant",
    description: "Sam Druant (b. 1998, Antwerp, Belgium) holds a BA and MA in Textile Design from LUCA School of Arts Ghent and an MFA in Fine Arts from HDK-Valand University of Gothenburg, where she expanded her textile-based practice into a research-driven approach."
  });

  const getPortfolio = computed<Portfolio>(() => portfolio.value);

  const setPortfolio = (newPortfolio: Portfolio) => {
    portfolio.value = newPortfolio;
  };

  const getSocials = computed<{ name: string, url: string }[]>(() => {
    return [
      { name: "Instagram", url: "https://www.instagram.com/samdruant" }
    ];
  });

  const getEmail = computed<string>(() => {
    return "sam.druant@gmail.com";
  });

  return { getPortfolio, setPortfolio, getSocials, getEmail };
});
