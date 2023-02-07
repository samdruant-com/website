import express from "express";
import AuthService from "../services/AuthService/index.js";
import ErrorHelper from "./helpers/ErrorHelper.js";

export default {
	/**
	 * login admin
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async Login(req, res) {
		try {
			const credentials = await AuthService.login(req.body);
			return res.status(201).send(credentials);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * refresh tokens
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @returns {Promise<express.Response>} res
	 */
	async Refresh(req, res) {
		try {
			// get request token
			const accessToken = req.headers?.authorization?.split(" ")[1];
			const refreshToken = req.body?.refreshToken;

			const credentials = AuthService.refresh(accessToken, refreshToken);
			return res.status(201).send(credentials);
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	},
	/**
	 * authenticate request token
	 *
	 * @param {express.Request} req
	 * @param {express.Response} res
	 * @param {express.NextFunction} next
	 * @returns {Promise<express.Response>} res
	 */
	async Authenticate(req, res, next) {
		try {
			// get request token
			const token = req.headers?.authorization?.split(" ")[1];
			req.admin = await AuthService.authenticate(token);
			return next();
		}
		catch (error) {
			return ErrorHelper(error, res);
		}
	}
};
