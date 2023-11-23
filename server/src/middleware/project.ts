import * as ProjectData from "../data/project";
import { createErrorResponse } from "./helpers/error";
import type { AuthenticatedRequest } from "./helpers/types";
import type { Request, Response } from "express";

async function postProject(req: Request, res: Response) {
	try {
		const project = await ProjectData.createProject({ ...req.body });
		return res.status(201).send(project);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function getProject(req: Request, res: Response) {
	const id = req.params.id;
  
	try {
		const projects = await ProjectData.getProject(id);
      
		return res.status(200).send(projects);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function indexProjects(req: Request, res: Response) {
	try {
		const projects = await ProjectData.indexProjects();
		return res.status(200).send(projects);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function patchProject(req: AuthenticatedRequest, res: Response) {
	const id = req.params.id;

	try {
		const projects = await ProjectData.updateProject(id, { ...req.body });
		return res.status(200).send(projects);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function deleteProject(req: AuthenticatedRequest, res: Response) {
	const id = req.params.id;

	try {
		const projects = await ProjectData.deleteProject(id);
		return res.status(203).send(projects);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

export { postProject, getProject, indexProjects, patchProject, deleteProject };
