import { defineStore } from 'pinia'
import { useAuthStore } from '~/stores/auth-store';
import type { Portfolio } from '~/types'

export const usePortfolioStore = defineStore('portfolio', () => {

  const { request } = useRequest();
  const authStore = useAuthStore();

  const portfolio = ref<Portfolio>({
    _id: '',
    name: 'Sam Druant',
    email: 'sam.druant@gmail.com',
    socials: [{name: 'instagram', url: 'https://www.instagram.com/samdruant'}]
  });

  async function postPortfolio(newPortfolio: Partial<Portfolio>): Promise<Portfolio> {
    const {_id, name, email, socials } = await request('/portfolios', {
      method: 'POST',
      body: JSON.stringify(newPortfolio),
      authorization: authStore.accessToken
    }) as unknown as Portfolio;

    portfolio.value._id = _id;
    portfolio.value.name = name;
    portfolio.value.email = email;
    portfolio.value.socials = socials;

    return portfolio.value;
  }

  async function indexPortfolios(): Promise<Portfolio[]> {
    return await request('/portfolios');
  }

  async function getPortfolio(portfolioId: string): Promise<Portfolio> {
    return await request(`/portfolios/${portfolioId}`)
  }

  async function patchPortfolio(id: string, portfolioPatch: Partial<Portfolio>): Promise<Portfolio> {
    const {_id, name, email, socials } = await request(`/portfolios/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(portfolioPatch),
      authorization: authStore.accessToken
    }) as unknown as Portfolio;

    portfolio.value._id = _id;
    portfolio.value.name = name;
    portfolio.value.email = email;
    portfolio.value.socials = socials;

    return portfolio.value;
  }

  onMounted(async () => {
    if(portfolio.value._id.trim() === ''){
      const data = await indexPortfolios();
      if(!data.length) return;
      portfolio.value = data[0];
    }
  })

  return { portfolio, postPortfolio, indexPortfolios, getPortfolio, patchPortfolio }
})
