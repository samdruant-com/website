import { IBucket } from "./IBucket.js";
import AWS from "aws-sdk";
import Config from "../../config/EnvConfig.js";

const { DO_SPACE, DO_SPACE_NAME, DO_SPACE_ACCESS_KEY, DO_SPACE_SECRET_KEY } =
	Config;

// setup upload endpoint
const DigitalOceanSpace = new AWS.Endpoint(DO_SPACE);

// s3 client
const S3 = new AWS.S3({
	endpoint: DigitalOceanSpace,
	credentials: {
		accessKeyId: DO_SPACE_ACCESS_KEY,
		secretAccessKey: DO_SPACE_SECRET_KEY,
	},
});

class DoBucket extends IBucket {
	/**
	 * saves image
	 *
	 * @param {string} id - project id
	 * @param {Express.Multer.File} file - image file
	 * @returns {Promise<string>} image path
	 */
	async save(id, file) {
		// save file to s3
		const result = await S3.upload({
			Bucket: DO_SPACE_NAME,
			Key: id,
			Body: file.buffer,
			ACL: "public-read",
		}).promise();

		// if url does not have a protocol, add it
		return !result.Location.includes("http")
			? `https://${result.Location}`
			: result.Location;
	}

	/**
	 * saves files
	 *
	 * @param {Express.Multer.File[]} files
	 * @returns {Promise<string[]>} - image paths
	 */
	saveMany(files) {
		return files.map(async (file) => {
			return await this.save(file);
		});
	}

	/**
	 *
	 * @param {string} id - file unique identifier
	 * @returns {Promise<boolean>} deleted
	 */
	async remove(id) {
		try {
			const result = await S3.deleteObject({
				Bucket: DO_SPACE_NAME,
				Key: id,
			}).promise();

			return result.DeleteMarker;
		}
		catch (error) {
			return false;
		}
	}

	/**
	 *
	 * @param {string[]} files - list of file unique identifiers
	 * @returns {Promise<boolean>} deleted
	 */
	async removeMany(files) {
		return files.map(async (file) => {
			return await this.remove(file);
		});
	}
}

export default new DoBucket();