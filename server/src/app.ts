import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./router";
import { ALLOWED_ORIGINS } from "./config/env";

const app = express();

/**
 * Configure cors middleware to curate requests based on origin
 */
app.use(cors({
	/**
   * This function is called for every request to check if the origin is allowed
   * based on the ALLOWED_ORIGINS environment variable which can be set to a comma
   * separated list of origins or to '*' to allow all origins.
   * 
   * A origin is allowed if:
   * - ALLOWED_ORIGINS is undefined or '*'
   * - ALLOWED_ORIGINS is a comma separated list and the origin is in the list
   */
	origin: (origin, callback) => {
		// allow requests with no origin if ALLOWED_ORIGINS is undefined or '*'
		if(!ALLOWED_ORIGINS || ALLOWED_ORIGINS === "*") {
			return callback(null, true);
		}

		// allow requests with origin that matches ALLOWED_ORIGINS
		else {
			const allowedOrigins = ALLOWED_ORIGINS.split(",");
			const isAllowed = allowedOrigins.includes(origin as string);
			return callback(null, isAllowed);
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"]
}));

/**
 * Configure morgan to log requests
 */
app.use(morgan("dev"));

/**
 * Configure router middleware
 */
app.use(router);

export default app;
