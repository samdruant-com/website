import * as PortfolioData from "../data/portfolio";
import { createErrorResponse } from "./helpers/error";
import type { AuthenticatedRequest } from "./helpers/types";
import type { Request, Response } from "express";

async function postPortfolio(req: AuthenticatedRequest, res: Response) {
	try {
		const portfolio = await PortfolioData.createPortfolio({ ...req.body });
		return res.status(201).send(portfolio);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function getPortfolio(req: Request, res: Response) {
	const id = req.params.id;
  
	try {
		const portfolio = await PortfolioData.getPortfolioById(id);
		return res.status(200).send(portfolio);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function indexPortfolios(req: Request, res: Response) {
	try {
		const portfolios = await PortfolioData.indexPortfolios();
		return res.status(200).send(portfolios);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function patchPortfolio(req: AuthenticatedRequest, res: Response) {
	const id = req.params.id;

	try {
		const portfolio = await PortfolioData.updatePortfolio(id, { ...req.body });
		return res.status(200).send(portfolio);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function deletePortfolio(req: AuthenticatedRequest, res: Response) {
	const id = req.params.id;

	try {
		const portfolio = await PortfolioData.deletePortfolio(id);
		return res.status(203).send(portfolio);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

export { postPortfolio, getPortfolio, indexPortfolios, patchPortfolio, deletePortfolio };
