import mongoose from "mongoose";
import SchemaLogic from "../logic/SchemaLogic.js";
import BucketService from "../services/BucketService/index.js";
import { GeneralError } from "../logic/ErrorLogic.js";

export default {
	AboutModel: mongoose.model(
		"about",
		new mongoose.Schema(
			{
				bio: { type: String, required: true },
				image: { type: String, default: null },
			},
			{ timestamps: true }
		)
	),

	/**
	 *
	 * @param {string} bio
	 * @param {string} image
	 * @returns {Promise<mongoose.Document>} about
	 */
	async createAbout(bio, image) {
		const request = {
			bio: bio,
			image: image,
		};

		const validAbout = SchemaLogic.validateAbout(request);
		if (validAbout.error) {
			throw new GeneralError(validAbout.error.message, 400);
		}

		// check if an about already exists
		const about = await this.AboutModel.findOne();
		if (about) {
			throw new GeneralError("Only one about document is allowed", 409);
		}

		return await this.AboutModel.create(new this.AboutModel(request));
	},

	/**
	 *
	 * @returns {Promise<mongoose.Document>} about
	 */
	async getAbout() {
		return await this.AboutModel.findOne().exec();
	},

	/**
	 *
	 * @param {object} patch
	 * @param {string} patch.bio
	 * @param {string} patch.image
	 * @returns {Promise<mongoose.Document>} about
	 */
	async updateAbout({ bio, image }) {
		const about = await this.getAbout();

		const patch = {
			bio: bio || about.bio,
			image: image || about.image,
		};

		const validAbout = SchemaLogic.validateAbout(patch);
		if (validAbout.error) {
			throw new GeneralError(validAbout.error.message, 400);
		}

		try {
			// remove old image from bucket
			if (image && patch.image !== about.image) {
				await BucketService.remove(about.image);
			}

			// update about
			about.bio = patch.bio;
			about.image = patch.image;

			return await about.save();
		}
		catch (error) {
			if (image) {
				await BucketService.remove(image);
			}

			throw error;
		}
	},
};
