import express from "express";
import AdminData from "../data/AdminData.js";
import AuthService from "../services/AuthService/index.js";
import ErrorHelper from "./helpers/ErrorHelper.js";
import { EnvConfig } from "../config/index.js";
import { GeneralError } from "../logic/ErrorLogic.js";

const { AUTH_ADMIN_SECRET } = EnvConfig;
export default {
	/**
	 * post about
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async PostAdmin(req, res) {
		try {
			if(req.body.secret !== AUTH_ADMIN_SECRET) {
				throw new GeneralError("Unauthorized access", 401);
			}

			req.body.password = AuthService.hash(req.body.password);
			const admin = await AdminData.createAdmin(req.body);
			return res.status(201).send(admin);
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
	async GetAdmin(req, res) {
		try {
			const admin = await AdminData.getAdmin(req.params.id);
			return res.status(200).send(admin);
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
	async PatchAdmin(req, res) {
		try {
			const admin = await AdminData.updateAdmin(req.params.id, req.body);
			return res.status(200).send(admin);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	}
};
