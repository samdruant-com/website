import express from "express";
import ProjectData from "../data/ProjectData.js";
import ErrorHelper from "./helpers/ErrorHelper.js";
import BucketService from "../services/BucketService/index.js";
import { GeneralError } from "../logic/ErrorLogic.js";

/**
 *
 * @param {object[]} images
 * @param {Express.Multer.File[]} files
 * @returns
 */
async function processImages(images, files) {
	return Promise.all(
		images.map(async (image) => {
			// if image has a file field, it is should have a file from files array
			if (image.file) {
				// find file that has filename equal to image.file
				const file = files.find(function (file) {
					return file.originalname === image.file;
				});
				// if file is not found, throw error
				if (!file) {
					throw new GeneralError(`File ${image.file} not found`, 400);
				}
				// create an image doc
				const imageDoc = new ProjectData.ImageModel({
					url: "n/a",
					order: image.order,
					caption: image.caption || "caption missing",
				});
				// store file in a location
				imageDoc.src = await BucketService.save(imageDoc.id, file);

				return imageDoc;
			}

			return image;
		})
	);
}

export default {
	/**
	 * post project
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async PostProject(req, res) {
		try {
			// create project
			const project = await ProjectData.createProject({
				name: req.body.name,
				description: req.body.description,
				publish: req.body.publish,
				images: await processImages(JSON.parse(req.body.images), req.files),
			});
			return res.status(201).send(project);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * get project
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async GetProject(req, res) {
		try {
			const project = await ProjectData.getProject(req.params.id);
			return res.status(200).send(project);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * get published or unpublished project
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async GetSecretProject(req, res) {
		try {
			const project = await ProjectData.getProject(req.params.id, true);
			return res.status(200).send(project);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * index projects
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async IndexProjects(req, res) {
		try {
			const projects = await ProjectData.indexProjects();
			return res.status(200).send(projects);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * index published and unpublished projects
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async IndexSecretProjects(req, res) {
		try {
			const projects = await ProjectData.indexProjects({ showHidden: true });
			return res.status(200).send(projects);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * patch project
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async PatchProject(req, res) {
		try {
			// update project
			const project = await ProjectData.updateProject(req.params.id, {
				name: req.body.name,
				description: req.body.description,
				publish: req.body.publish,
				images: await processImages(JSON.parse(req.body.images), req.files),
			});
			return res.status(200).send(project);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * delete project
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async DeleteProject(req, res) {
		try {
			const project = await ProjectData.deleteProject(req.params.id);
			return res.status(203).send(project);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
};
