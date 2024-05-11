import Mongoose from "mongoose";
import { createSlug } from "../utils/slug";
import type { IWork } from "../types";

type WorkDocument = IWork & Mongoose.Document;

const WorkModel = Mongoose.model("work", new Mongoose.Schema<IWork>(
	{
		name: { type: String, required: true },
		date: { type: String },
		size: { type: String },
		material: { type: String },
		images: [{
			src: { type: String, required: true },
			caption: { type: String, default: "" },
			order: { type: Number, default: 0 }
		}],
		slug: { type: String, unique: true },
		visible: { type: Boolean, default: false }
	},
	{ timestamps: true })
	.pre("save", async function (next) {
		if(this.isModified("name")) {
			let slug: string = createSlug(this.name);
			let count = 1;

			while(await getWork(slug)) {
				slug = slug + "-" + count;
				count++; 
			}
      
			this.slug = slug;
		}

		next();
	})
);

async function createWork(work: IWork): Promise<WorkDocument> {
	work.images = work.images.sort((a, b) => Number(a.order) - Number(b.order));
  
	return await WorkModel.create(new WorkModel(work));
}

async function getWork(id: string, config?: { showHidden?: boolean}): Promise<WorkDocument | null> {
	const baseQuery = Mongoose.isObjectIdOrHexString(id) ? { _id: id } : { slug: id };
	const query = config?.showHidden ? baseQuery : { ...baseQuery, visible: true };

	return await WorkModel.findOne(query)
		.exec();
}

async function indexWorks(config?: { showHidden?: boolean}): Promise<WorkDocument[]> {
	const query = config?.showHidden ? {} : { visible: true };
	return await WorkModel.find(query)
		.exec();
}

async function updateWork(id: string, patch: Partial<IWork>): Promise<WorkDocument | null> {
	const work = await getWork(id, { showHidden: true });

	if(!work){
		throw new Error(`Work with id ${id} not found`);
	}

	Object.assign(work, patch);

	work.images = work.images.sort((a, b) => Number(a.order) - Number(b.order));

	return await work.save();
}

async function deleteWork(id: string): Promise<WorkDocument | null> {
	const work = await getWork(id, { showHidden: true });

	if(!work){
		throw new Error(`Work with id ${id} not found`);
	}
  
	return await WorkModel.findByIdAndDelete(id).exec();
}

export { WorkDocument, createWork, getWork, indexWorks, updateWork, deleteWork };