import express from "express";
import AboutData from "../data/AboutData.js";
import ErrorHelper from "./helpers/ErrorHelper.js";
import BucketService from "../services/BucketService/index.js";

export default {
	/**
	 * post about
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async PostAbout(req, res) {
		try {
			if(req.file){
				req.body.image = await BucketService.save(req.file);
			}
      
			const about = await AboutData.createAbout(req.body.bio, req.body.image);
			return res.status(201).send(about);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * get about
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async GetAbout(req, res) {
		try {
			let about = await AboutData.getAbout();

			if (!about) {
				about = await AboutData.createAbout("# Hi! \nMy name is Oscar and I'd like to welcome you to my website!", null);
			}

			return res.status(200).send(about);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * patch about
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async PatchAbout(req, res) {
		try {
			if(req.file) {
				req.body.image = await BucketService.save(req.file);
			}

			const about = await AboutData.updateAbout(req.body);
			return res.status(200).send(about);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	}
};
