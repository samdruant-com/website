import Mongoose from "mongoose";
import { createSlug } from "../utils/slug";
import type { IProject } from "../types";

type ProjectDocument = IProject & Mongoose.Document;

const ProjectModel = Mongoose.model("project", new Mongoose.Schema<IProject>(
	{
		name: { type: String, required: true },
		date: { type: String },
		works: [{ type: Mongoose.Schema.ObjectId, ref: 'work' }],
		slug: { type: String, unique: true },
		visible: { type: Boolean, default: false }
	},
	{ timestamps: true })
	.pre("save", async function (next) {
		if(this.isModified("name")) {
			let slug: string = createSlug(this.name);
			let count = 1;

			while(await getProject(slug)) {
				slug = slug + "-" + count;
				count++; 
			}
      
			this.slug = slug;
		}

		next();
	})
);

async function createProject(project: IProject): Promise<ProjectDocument> {
	return await ProjectModel.create(new ProjectModel(project));
}

async function getProject(id: string, config?: { showHidden?: boolean}): Promise<ProjectDocument | null> {
	const baseQuery = Mongoose.isObjectIdOrHexString(id) ? { _id: id } : { slug: id };
	const query = config?.showHidden ? baseQuery : { ...baseQuery, visible: true };

	return await ProjectModel.findOne(query)
		.populate('works')
		.exec();
}

async function indexProjects(config?: { showHidden?: boolean}): Promise<ProjectDocument[]> {
	const query = config?.showHidden ? {} : { visible: true };

	return await ProjectModel.find(query)
		.populate('works')
		.exec();
}

async function updateProject(id: string, patch: Partial<IProject>): Promise<ProjectDocument | null> {
	const project = await getProject(id, { showHidden: true });

	if(!project){
		throw new Error(`Project with id ${id} not found`);
	}

	Object.assign(project, patch);

	return await project.save();
}

async function deleteProject(id: string): Promise<ProjectDocument | null> {
	const project = await getProject(id, { showHidden: true });

	if(!project){
		throw new Error(`Project with id ${id} not found`);
	}
  
	return await ProjectModel.findByIdAndDelete(id).exec();
}

export { ProjectDocument, createProject, getProject, indexProjects, updateProject, deleteProject };