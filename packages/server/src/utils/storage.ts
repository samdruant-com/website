import axios from "axios";
import formData from "form-data";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { PutObjectCommandInput } from "@aws-sdk/client-s3";
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

class AwsBucket implements GenericBucket {
	s3Client: S3Client;
	bucketName: string;
	bucketRegion: string|undefined;

	constructor(config: { accessKeyId: string; secretAccessKey: string; bucketName: string; bucketEndpoint: string; bucketRegion?: string;}) {
		this.s3Client = new S3Client({ 
			region: config.bucketRegion,
			endpoint: config.bucketEndpoint,
			credentials: { 
				accessKeyId: config.accessKeyId,
				secretAccessKey: config.secretAccessKey
			},
			forcePathStyle: true // required with localstack
		});

		this.bucketName = config.bucketName;
		this.bucketRegion = config.bucketRegion;
	}

	async uploadFile (file: Express.Multer.File, config?: { name?: string }): Promise<string> {
		const params: PutObjectCommandInput = {
			Bucket: this.bucketName,
			Key: config?.name || file.originalname,
			Body: file.buffer,
			ContentType: file.mimetype,
			ACL: "public-read",
		};

		await this.s3Client.send(new PutObjectCommand(params));

		//return `http://${this.bucketName}.s3.${this.bucketRegion}.localhost:4566/${params.Key}`;
		return `https://${this.bucketName}.${this.bucketRegion}.cdn.digitaloceanspaces.com/${this.bucketName}/${params.Key}`; // <- digital ocean spaces
	}

	/**
   * Removes a file from the bucket and returns true if successful.
   */
	async removeFile(url: string): Promise<boolean> {
		try {
			const filename = url.split("/").pop();

			// remove file from bucket
			await this.s3Client.send(new PutObjectCommand({
				Bucket: this.bucketName,
				Key: filename,
			}));

			return true;
		} catch (error) {
			return false;
		}
	}
}

export { BasicBucket, AwsBucket };