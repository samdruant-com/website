import Mongoose from "mongoose";
import { createSlug } from "../utils/slug";
import type { IProject } from "../types";

type ProjectDocument = IProject & Mongoose.Document;

const ProjectModel = Mongoose.model("project", new Mongoose.Schema<IProject>(
	{
		name: { type: String, required: true },
		date: { type: String },
		works: [{ type: Mongoose.Schema.ObjectId, ref: 'work' }],
		slug: { type: String, unique: true }
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

async function getProject(id: string): Promise<ProjectDocument | null> {
	const query = Mongoose.isValidObjectId(id) 
		? ProjectModel.findById(id)
			.populate('works')
		: ProjectModel.findOne({ slug: id })
			.populate('works');

	return await query.exec();
}

async function indexProjects(): Promise<ProjectDocument[]> {
	return await ProjectModel.find()
		.populate('works')
		.exec();
}

async function updateProject(id: string, patch: Partial<IProject>): Promise<ProjectDocument | null> {
	const project = await getProject(id);

	if(!project){
		throw new Error(`Project with id ${id} not found`);
	}

	Object.assign(project, patch);

	return await project.save();
}

async function deleteProject(id: string): Promise<ProjectDocument | null> {
	const project = await getProject(id);

	if(!project){
		throw new Error(`Project with id ${id} not found`);
	}
  
	return await ProjectModel.findByIdAndDelete(id).exec();
}

export { ProjectDocument, createProject, getProject, indexProjects, updateProject, deleteProject };