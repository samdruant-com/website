import type { Portfolio } from "~/types";
import { defineStore } from "pinia";

export const usePortfolioStore = defineStore("portfolio", () => {
  const { request } = useRequest();

  const portfolio = ref<Portfolio>({
    _id: "",
    name: "Sam Druant",
    email: "sam.druant@gmail.com",
    socials: [{ name: "instagram", url: "https://www.instagram.com/samdruant" }]
  });

  async function indexPortfolios(): Promise<Portfolio[]> {
    return await request("/portfolios");
  }

  async function getPortfolio(portfolioId: string): Promise<Portfolio> {
    return await request(`/portfolios/${portfolioId}`);
  }

  onMounted(async () => {
    if (portfolio.value._id.trim() === "") {
      const data = await indexPortfolios();
      if (!data.length)
        return;
      portfolio.value = data[0];
    }
  });

  return { portfolio, indexPortfolios, getPortfolio };
});
