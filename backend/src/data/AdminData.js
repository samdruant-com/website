import mongoose from "mongoose";
import SchemaLogic from "../logic/SchemaLogic.js";
import { DataError } from "../logic/ErrorLogic.js";

export default {
	AdminModel: mongoose.model(
		"admin",
		new mongoose.Schema(
			{
				email: { type: String, required: true },
				password: { type: String, required: true },
			},
			{ timestamps: true }
		)
	),

	/**
	 * 
	 * @param {object} request 
	 * @param {string} request.email
	 * @param {string} request.password
	 * @returns {Promise<mongoose.Document>} admin
	 */
	async createAdmin({ email, password } = {}) {
		const request = {
			email: email,
			password: password,
		};

		try{
			await this.getAdminByEmail(request.email);
			throw new DataError(`An admin with the email ${request.email} already exists`, 409);
		}
		catch(error){
			if(!(error instanceof DataError && error.statusCode === 404)){
				throw error;
			}
		}

		const validAdmin = SchemaLogic.validateAdmin(request);
		if (validAdmin.error) {
			throw new DataError(validAdmin.error.message, 400);
		}

		const admin = await this.AdminModel.create(new this.AdminModel(request));
		// remove password from response
		admin.password = undefined;
    
		return admin;
	},

	/**
	 * 
	 * @param {string} id 
	 * @param {object} options
	 * @param {boolean} options.secret
	 * @returns {Promise<mongoose.Document>} admin
	 */
	async getAdmin(id, { secret = false } = {}) {
		const admin = await this.AdminModel.findById(id, secret ? {} : { password: 0 });

		if (!admin) {
			throw new DataError(`Admin with id ${id} not found`, 404);
		}

		return admin;
	},

	/**
	 * 
	 * @param {string} email
	 * @param {object} options
	 * @param {boolean} options.secret
	 * @returns {Promise<mongoose.Document>} admin
	 */
	async getAdminByEmail(email, { secret = false } = {}) {
		const admin = await this.AdminModel.findOne({ email: email }, secret ? {} : { password: 0 });

		if (!admin) {
			throw new DataError(`Admin with email ${email} not found`, 404);
		}

		return admin;
	},

	/**
	 * 
	 * @param {string} id
	 * @param {object} patch
	 * @param {string} patch.email
	 * @param {string} patch.password
	 * @returns {Promise<mongoose.Document>} admin
	 */
	async updateAdmin(id, { email, password } = {}) {
		const admin = await this.getAdmin(id, { secret: true });

		const patch = {
			email: email || admin.email,
			password: password || admin.password,
		};

		const validAdmin = SchemaLogic.validateAdmin(patch);
		if (validAdmin.error) {
			throw new DataError(validAdmin.error.message, 400);
		}

		return await this.AdminModel.findByIdAndUpdate(id, patch, { new: true });
	},

	async deleteAdmin({ id } = {}) {
		throw new DataError("Not implemented", 501);
	},
};
