import Mongoose from "mongoose";
import type { IPortfolio } from "../types";

type PortfolioDocument = IPortfolio & Mongoose.Document;

const PortfolioModel = Mongoose.model(
	"portfolio",
	new Mongoose.Schema<IPortfolio>(
		{
			name: { type: String, required: true, unique: true },
			email: { type: String, required: true, unique: true },
			socials: [{
				name: { type: String, required: true },
				url: { type: String, required: true }
			}]
		},
		{ timestamps: true }
	)
);

async function createPortfolio(portfolio: IPortfolio): Promise<PortfolioDocument> {
	return await PortfolioModel.create(new PortfolioModel(portfolio));
}

async function getPortfolioById(id: string): Promise<PortfolioDocument | null> {
	return await PortfolioModel.findById(id).exec();
}

async function indexPortfolios(): Promise<PortfolioDocument[]> {
	return await PortfolioModel.find().exec();
}

async function updatePortfolio(id: string, patch: Partial<IPortfolio>): Promise<PortfolioDocument | null> {
	const portfolio = await getPortfolioById(id);

	if(!portfolio){
		throw new Error(`Portfolio with id ${id} not found`);
	}

	portfolio.name = patch.name || portfolio.name;
	portfolio.email = patch.email || portfolio.email;
	portfolio.socials = patch.socials || portfolio.socials;

	return await portfolio.save();
}

async function deletePortfolio (id: string): Promise<PortfolioDocument | null> {
	const portfolio = await getPortfolioById(id);

	if(!portfolio){
		throw new Error(`Portfolio with id ${id} not found`);
	}

	return await PortfolioModel.findByIdAndDelete(portfolio.id);
}

export { 
	PortfolioDocument,
	PortfolioModel,
	createPortfolio,
	getPortfolioById,
	indexPortfolios,
	updatePortfolio,
	deletePortfolio
};
