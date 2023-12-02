import axios from "axios";
import formData from "form-data";
import { Storage, Bucket } from "@google-cloud/storage";
import type { AxiosInstance } from 'axios';

/**
 * Generic Bucket Interface for uploading and removing files
 */
export interface GenericBucket {
  /**
   * Upload a file to the bucket and return the url
   * 
   * @param config the upload configuration
   * @param config.name the name of the file
   */
  // eslint-disable-next-line no-unused-vars
  uploadFile: (file: Express.Multer.File, config?: { name: string }) => Promise<string>;
  /**
   * Removes a file from the bucket and returns true if successful.
   * 
   * @param url the url of the file to be removed
   */
  // eslint-disable-next-line no-unused-vars
  removeFile(url: string): Promise<boolean>;
}

/**
 * Custom Bucket Logic
 */
class BasicBucket implements GenericBucket {
	endpoint: string;
	axiosClient: AxiosInstance;

	constructor(config: { endpoint: string; }) {
		this.endpoint = config.endpoint;

		this.axiosClient = axios.create({
			baseURL: this.endpoint,
			maxContentLength: Infinity,
			maxBodyLength: Infinity,
		});
	}

	async uploadFile(file: Express.Multer.File, config?: { name?: string; }): Promise<string> {
		const form = new formData();
		form.append("files", file.buffer, config?.name || file.originalname);

		const response = await this.axiosClient.post("/assets", form, { headers: form.getHeaders() });

		if(response.status !== 201) {
			throw response;
		}

		const images = response.data;
		return images[0].url;
	}

	async removeFile(url: string): Promise<boolean> {
		// get file name from url
		const filename = url.split("/").pop();
		// delete file from server
		const response = await this.axiosClient.delete(`/assets/${filename}`);
		// return true if deleted
		return response.data;
	}
}

/**
 * GCP Data Storage
 */
class GoogleBucket implements GenericBucket {
	projectName: string;
	bucketName: string;
	
	gcStorage: Storage;
	gcBucket: Bucket;

	constructor(config: { projectName: string;  bucketName: string; keyPath: string; }) {
		this.projectName = config.projectName;
		this.bucketName = config.bucketName;
		this.gcStorage = new Storage({ keyFilename: config.keyPath, projectId: config.projectName });
		this.gcBucket = this.gcStorage.bucket(this.bucketName);
	}

	/**
   * Uploads a file to the bucket and returns the url.
   * 
   * By default, the file:
   * - is public
   * - has the same name as the original file
   */
	async uploadFile (file: Express.Multer.File, config?: { name?: string }): Promise<string> {
		// save file to bucket with config.name or file.originalname as name
		await this.gcBucket.file(config?.name || file.originalname)
			.save(file.buffer, {
				public: true,
				metadata: { contentType: file.mimetype, },
			});

		// return url
		return `https://storage.googleapis.com/${this.bucketName}/${config?.name || file.originalname}`;
	}

	/**
   * Removes a file from the bucket and returns true if successful.
   */
	async removeFile(url: string): Promise<boolean> {
		try {
			await this.gcBucket.file(url).delete();
			return true;
		} catch (error) {
			return false;
		}
	}
}

export { BasicBucket, GoogleBucket };