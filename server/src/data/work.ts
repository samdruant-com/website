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
			place: { type: String },
			photographer: { type: String }
		}],
		slug: { type: String, unique: true }
	},
	{ timestamps: true })
	.pre("save", async function (next) {
		if(this.isModified("name")) {
			let slug: string = createSlug(this.name);
			let count = 1;

			while(await getWorkBySlug(slug)) {
				slug = slug + "-" + count;
				count++; 
			}
      
			this.slug = slug;
		}

		next();
	})
);

async function createWork(work: IWork): Promise<WorkDocument> {
	return await WorkModel.create(new WorkModel(work));
}

async function getWorkById(id: string): Promise<WorkDocument | null> {
	return await WorkModel.findById(id).exec();
}

async function getWorkBySlug(slug: string): Promise<WorkDocument | null> {
	return await WorkModel.findOne({ slug }).exec();
}

async function indexWorks(): Promise<WorkDocument[]> {
	return await WorkModel.find().exec();
}

async function updateWork(id: string, patch: Partial<IWork>): Promise<WorkDocument | null> {
	const work = await getWorkById(id);

	if(!work){
		throw new Error(`Work with id ${id} not found`);
	}

	Object.assign(work, patch);

	return await work.save();
}

async function deleteWork(id: string): Promise<WorkDocument | null> {
	const work = await getWorkById(id);

	if(!work){
		throw new Error(`Work with id ${id} not found`);
	}
  
	const deletedWork = await WorkModel.findByIdAndDelete(id).exec();
	
	// TODO: delete images from cdn
  
	return deletedWork;
}

export { WorkDocument, createWork, getWorkById, getWorkBySlug, indexWorks, updateWork, deleteWork };