import express from "express";
import UserData from "../data/UserData.js";
import ImageData from "../data/ImageData.js";
import ErrorHelper from "./helpers/ErrorHelper.js";
import BucketService from "../services/BucketService/index.js";

/**
 * Returns a new image object
 *
 * @param {object} image
 * @param {Express.Multer.File[]} file
 * @returns {Promise<object>} image
 */
async function processImage(image, file){
	if(!image) return null;

	if(file){
		// create an image doc
		const imageDoc = new ImageData.ImageModel({
			src: "n/a",
			order: image.order,
			caption: image.caption || "caption missing",
		});

		// upload file to bucket
		const imageUrl = await BucketService.save(imageDoc.id, file);

		// set image src to imageUrl
		imageDoc.src = imageUrl;

		return imageDoc;
	}

	return image;
}

export default {
	/**
	 * post user
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async PostUser(req, res) {
		try {
			const image = await processImage(req.body.image, req.file);
      
			const user = await UserData.createUser(req.body.name, req.body.bio, image);
			return res.status(201).send(user);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * get user
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async GetUser(req, res) {
		try {
			let user = await UserData.getUser();

			if (!user) {
				user = await UserData.createUser(
					"Oliver",
					"I like to make websites for friends",
					"hello@oliverrr.net",
					{ src: "https://avatars.githubusercontent.com/u/16879430?v=4", caption: "Profile Picture" },
					[{ label: "GitHub", url: "https://github.com/this-oliver" }]
				);
			}

			return res.status(200).send(user);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * patch user
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async PatchUser(req, res) {
		try {
			req.body.image = await processImage(JSON.parse(req.body.image), req.file);
			if(req.body.links) req.body.links = JSON.parse(req.body.links);
      
			const user = await UserData.updateUser(req.body);
			return res.status(200).send(user);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	}
};
