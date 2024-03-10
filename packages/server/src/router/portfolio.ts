import { postPortfolio, getPortfolio, indexPortfolios, patchPortfolio, deletePortfolio } from "../middleware/portfolio";
import type { Route } from "./helpers/types";

const BASE_PATH = "/portfolios";

const routes: Route[] = [
	{
		path: BASE_PATH,
		method: "post",
		protected: true,
		handler: [postPortfolio],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "get",
		handler: [getPortfolio],
	},
	{
		path: BASE_PATH,
		method: "get",
		handler: [indexPortfolios],
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "patch",
		protected: true,
		handler: [patchPortfolio]
	},
	{
		path: `${BASE_PATH}/:id`,
		method: "delete",
		protected: true,
		handler: [deletePortfolio]
	},
];

export { routes };