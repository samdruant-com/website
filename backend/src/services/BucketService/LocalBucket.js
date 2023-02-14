import axios from "axios";
import formData from "form-data";
import Env from "../../config/EnvConfig.js";
import { IBucket } from "./IBucket.js";

const { STATIC_URL } = Env;

const axiosClient = axios.create({
	baseURL: STATIC_URL
});

class LocalBucket extends IBucket {
	/**
	 * saves image
	 *
	 * @param id
	 * @param {Express.Multer.File} file
	 * @returns {Promise<string>} image path
	 */
	async save(id, file) {
		const form = new formData();
		form.append("files", file.buffer, id + file.originalname);

		const config = {
			maxContentLength: Infinity,
			maxBodyLength: Infinity,
			headers: form.getHeaders(),
		};

		const response = await axiosClient.post("/assets", form, config);

		if (response.status === 201) {
			const images = response.data;
			return images[0].url;
		}
		else {
			throw response;
		}
	}

	/**
	 *
	 * @param {string} url - path to file
	 * @returns {Promise<boolean>} deleted
	 */
	async remove(url) {
		// get file name from url
		const filename = url.split("/").pop();
		// delete file from server
		const response = await axiosClient.delete(`/assets/${filename}`);
		// return true if deleted
		return response.data;
	}
}

export default new LocalBucket();
