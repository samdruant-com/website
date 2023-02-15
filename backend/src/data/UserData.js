import mongoose from "mongoose";
import ImageData from "./ImageData.js";
import SchemaLogic from "../logic/SchemaLogic.js";
import BucketService from "../services/BucketService/index.js";
import { GeneralError } from "../logic/ErrorLogic.js";

/**
 * @typedef {object} image
 * @property {string} src - url to image
 * @property {string} caption - image caption
 * @property {number} order - image order
 */

export default {
	UserModel: mongoose.model(
		"user",
		new mongoose.Schema(
			{
				name: { type: String, required: true },
				bio: { type: String, required: true },
				email: { type: String, default: null },
				links: { type: Array, default: [] },
				image: ImageData.ImageModel.schema,
			},
			{ timestamps: true }
		)
	),

	/**
	 *
	 * @param {string} name
	 * @param {string} bio
	 * @param {string} email
	 * @param {image} image
	 * @param {object[]} links
	 * @returns {Promise<mongoose.Document>} user
	 */
	async createUser(name, bio, email, image, links) {
		const request = {
			name: name,
			bio: bio,
			email: email,
			image: image,
			links: links,
		};

		const validUser = SchemaLogic.validateUser(request);
		if (validUser.error) {
			throw new GeneralError(validUser.error.message, 400);
		}

		// check if an user already exists
		const user = await this.UserModel.findOne();
		if (user) {
			throw new GeneralError("Only one user document is allowed", 409);
		}

		return await this.UserModel.create(new this.UserModel(request));
	},

	/**
	 *
	 * @returns {Promise<mongoose.Document>} user
	 */
	async getUser() {
		return await this.UserModel.findOne().exec();
	},

	/**
	 *
	 * @param {object} patch
	 * @param {string} patch.name
	 * @param {string} patch.bio
	 * @param {string} patch.email
	 * @param {string} patch.image
	 * @param {object[]} patch.links
	 * @returns {Promise<mongoose.Document>} user
	 */
	async updateUser({ name, bio, email, image, links } = {}) {
		const user = await this.getUser();

		const patch = {
			name: name || user.name,
			bio: bio || user.bio,
			email: email || user.email,
			image: image || user.image,
			links: links || user.links,
		};

		const validUser = SchemaLogic.validateUser(patch);
		if (validUser.error) {
			throw new GeneralError(validUser.error.message, 400);
		}

		const oldImage = user.image;
		const imageHasChanged = (image && user.image?.src !== image?.src);

		// update user
		user.name = patch.name;
		user.bio = patch.bio;
		user.email = patch.email;
		user.image = patch.image;
		user.links = patch.links;

		let newUser = null;
		
		try {
			// save user
			newUser = await user.save();

			// remove old image from bucket
			if (imageHasChanged) {
				await BucketService.remove(oldImage.src);
			}

			return newUser;

		}
		catch (error) {
			// if patch fails, remove new image from bucket
			if (imageHasChanged) {
				await BucketService.remove(image);
			}

			throw error;
		}
	},
};
