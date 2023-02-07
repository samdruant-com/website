import express from "express";
import Env from "../../config/EnvConfig.js";

const { NODE_ENV } = Env;
/**
 *
 * @param {any} error
 * @param {express.Response} res
 * @returns {express.Response} response
 */
export default function (error, res) {
	if (NODE_ENV === "development") {
		console.debug(error);
	}

	return res
		.status(error.status || error.statusCode || 500)
		.send(error.message);
}
