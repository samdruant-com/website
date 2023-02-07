import mongoose from "mongoose";
import SchemaLogic from "../logic/SchemaLogic.js";
import BucketService from "../services/BucketService/index.js";
import { GeneralError } from "../logic/ErrorLogic.js";

const ImageModel = mongoose.model(
	"image",
	new mongoose.Schema(
		{
			src: { type: String, required: true },
			caption: { type: String },
			order: { type: Number, default: 0 },
		},
		{ timestamps: true }
	)
);

const ProjectModel = mongoose.model(
	"project",
	new mongoose.Schema(
		{
			name: { type: String, required: true },
			description: { type: String },
			images: [ImageModel.schema],
			publish: { type: Boolean, default: false },
		},
		{ timestamps: true }
	)
);

/**
 * @typedef {object} image
 * @property {string} url
 * @property {string} caption
 * @property {number} order
 */

export default {
	ImageModel,
	ProjectModel,

	/**
	 * Creates new project
	 *
	 * @param {object} params
	 * @param {string} params.name
	 * @param {string} params.description
	 * @param {image[]} params.images
	 * @param {boolean} params.publish
	 * @returns {Promise<mongoose.Document>} project
	 */
	async createProject({ name, description, images, publish } = {}) {
		const request = {
			name: name,
			description: description,
			images: images,
			publish: publish,
		};
		const valid = SchemaLogic.validateProject(request);
		if (valid.error) {
			throw new GeneralError(valid.error.message, 400);
		}

		return await this.ProjectModel.create(new this.ProjectModel(request));
	},

	/**
	 * Gets project with given id
	 *
	 * @param {string} id - project id
	 * @param {boolean} showHidden
	 * @returns {Promise<mongoose.Document>} project
	 */
	async getProject(id, showHidden = false) {
		const project = showHidden
			? await this.ProjectModel.findOne({ _id: id })
			: await this.ProjectModel.findOne({ _id: id, publish: true });

		if (!project) {
			throw new GeneralError(`Project not found {id: ${id}}`, 404);
		}

		return project;
	},

	/**
	 * Gets all projects
	 *
	 * @param {object} config
	 * @param {boolean} [config.showHidden]
	 * @returns {Promise<mongoose.Document[]>} projects
	 */
	async indexProjects({ showHidden = false } = {}) {
		return showHidden
			? await this.ProjectModel.find()
			: await this.ProjectModel.find({ publish: true });
	},

	/**
	 *
	 * @param {string} id - project id
	 * @param {object} config
	 * @param {string} [config.name]
	 * @param {string} [config.description]
	 * @param {image[]} [config.images]
	 * @param {boolean} [config.publish]
	 * @returns {Promise<mongoose.Document>} project
	 */
	async updateProject(id, { name, description, images, publish } = {}) {
		const project = await this.getProject(id, true);

		const patch = {
			name: name || project.name,
			description: description || project.description,
			images: project.images,
			publish: publish || project.publish,
		};

		const removedImages = [];

		if (images) {
			// get all images in project.images that are not in images array
			project.images.forEach((image) => {
				const removed = !images.some((image2) => image2.src === image.src);
				if (removed) {
					removedImages.push(image);
				}
			});

			// map all images in images array to images in project with the same url
			patch.images = images.map((image) => {
				const imageInProject = project.images.find(
					(image2) => image2.src === image.src
				);

				if (imageInProject) {
					// update fields in imageInProject with fields in image
					Object.keys(image).forEach((key) => {
						imageInProject[key] = image[key];
					});

					return imageInProject;
				} else {
					return image;
				}
			});
		}

		const valid = SchemaLogic.validateProject(patch);
		if (valid.error) {
			throw new GeneralError(valid.error.message, 400);
		}

		// update project with patch
		try {
			await project.updateOne(patch);

			removedImages.forEach((image) => {
				// remove image from bucket
				BucketService.remove(image.src);
				// remove from project.images
				project.images.id(image._id).remove();
			});

			return await this.getProject(id, true);
		} catch (error) {
			// delete all patch images that do not have a corresponding image in project.images
			images.forEach((image) => {
				if (!project.images.some((image2) => image2.src === image.src)) {
					BucketService.remove(image.src);
				}
			});

			throw error;
		}
	},

	/**
	 *
	 * @param {string} id - project id
	 * @returns {Promise<mongoose.Document>} project
	 */
	async deleteProject(id) {
		const project = this.getProject(id, true);

		// delete all images from project
		await project.images.forEach(async (image) => {
			await BucketService.remove(image.src);
		});

		return await project.remove();
	},
};
