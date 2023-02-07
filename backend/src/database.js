import mongoose from "mongoose";
import { EnvConfig } from "./config/index.js";

export default {
	/**
	 * Connects to the database
	 */
	async connect() {
		// connect to database
		return mongoose.connect(EnvConfig.MONGO_URL);
	},
};
