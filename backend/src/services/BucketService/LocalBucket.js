import axios from "axios";
import formData from "form-data";
import Config from "../../config/EnvConfig.js";
import { IBucket } from "./IBucket.js";

const axiosClient = axios.create({
	baseURL: Config.STATIC_URL,
});

class LocalBucket extends IBucket {
	/**
	 * saves image
	 *
	 * @param {Express.Multer.File} file
	 * @returns {Promise<string>} image path
	 */
	async save(file) {
		const form = new formData();
		form.append("files", file.buffer, file.originalname);

		const config = {
			maxContentLength: Infinity,
			maxBodyLength: Infinity,
			headers: form.getHeaders(),
		};

		const response = await axiosClient.post("/assets", form, config);

		if (response.status === 201) {
			const images = response.data;
			return images[0].src;
		} else {
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
