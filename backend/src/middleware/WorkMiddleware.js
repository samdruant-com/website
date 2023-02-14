import express from "express";
import Env from "../config/EnvConfig.js";
import WorkData from "../data/WorkData.js";
import ImageData from "../data/ImageData.js";
import BucketService from "../services/BucketService/index.js";
import ErrorHelper from "./helpers/ErrorHelper.js";
import { GeneralError } from "../logic/ErrorLogic.js";

const { NODE_ENV } = Env;

/**
 *
 * @param {object[]} images - array of images
 * @param {Express.Multer.File[]} files - array of files
 * @returns {Promise<object[]>} images
 */
async function processImages(images, files) {
	const newImages = [];

	return Promise.all(
		images.map(async(image) => {
			// if image has a file field, it should have a corresponding file in files array
			const hasFile = image.fileName !== undefined && image.fileName !== null;
      
			if (hasFile) {
				// find file that has filename equal to image.file
				const file = files.find(function(file) {
					return file.originalname === image.fileName;
				});

				// if file is not found, throw error
				if (!file) {
					throw new GeneralError(`File ${image.file} not found`, 400);
				}

				// create an image doc
				const imageDoc = new ImageData.ImageModel({
					src: "n/a",
					order: image.order,
					caption: image.caption || "caption missing",
				});

				// upload file to bucket
				const imageUrls = await BucketService.save(imageDoc.id, file);
        
				// add image to newImages array
				newImages.push(imageUrls);

				// set image src to imageUrls
				imageDoc.src = imageUrls;

				return imageDoc;
			}

			return image;
		})
	).catch((error) => {
		// delete all images that were uploaded
		newImages.forEach(async(url) => {
			if (NODE_ENV === "development") {
				await LocalBucket.remove(url);
			}
			else {
				await DoBucket.remove(url);
			}
		});
    
		// continue to throw error
		throw error;
	});
}

export default {
	/**
	 * post work
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async PostWork(req, res) {
		try {
			// create work
			const work = await WorkData.createWork({
				name: req.body.name,
				date: req.body.date,
				description: req.body.description,
				images: await processImages(JSON.parse(req.body.images), req.files),
				publish: req.body.publish,
			});

			return res.status(201).send(work);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * get work
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async GetWork(req, res) {
		try {
			const id = req.params.id;
      
			// check if id is a slug by looking for a dash between two words
			const isSlug = id.match(/(\w+)-(\w+)/);
			// if id is a slug, get work by slug
			const work = isSlug 
				? await WorkData.getWorkBySlug(req.params.id) 
				: await WorkData.getWork(req.params.id);

			return res.status(200).send(work);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * index works
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async IndexWorks(req, res) {
		try {
			const page = req.query.page ? parseInt(req.query.page) : null;
			const limit = req.query.limit ? parseInt(req.query.limit) : null;

			const works = await WorkData.indexWorks({ page, limit });
			return res.status(200).send(works);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * patch work
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async PatchWork(req, res) {
		try {
			// update work
			const work = await WorkData.updateWork(req.params.id, {
				name: req.body.name,
				date: req.body.date,
				description: req.body.description,
				publish: req.body.publish,
				images: await processImages(JSON.parse(req.body.images), req.files),
			});
			return res.status(200).send(work);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * delete work
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async DeleteWork(req, res) {
		try {
			const work = await WorkData.deleteWork(req.params.id);
			return res.status(203).send(work);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
};
