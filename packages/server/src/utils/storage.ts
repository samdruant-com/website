import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import type { PutObjectCommandInput } from "@aws-sdk/client-s3";

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
  removeFile(url: string): Promise<unknown>;
}

class AwsBucket implements GenericBucket {
	s3Client: S3Client;
	bucketName: string;
	bucketEndpoint: string;
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
		this.bucketEndpoint = config.bucketEndpoint;
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

		return `${this.bucketEndpoint}/${this.bucketName}/${params.Key}`;
	}

	/**
   * Removes a file from the bucket and returns true if successful.
   */
	async removeFile(url: string): Promise<unknown> {
		// url is in the form of `http://localhost:4566/bucket-name/filename`
		const urlParts = url.split("/");

		if (urlParts.length < 4) {
			throw new Error("Invalid object url - must be in the form `https://<url>/<bucket-name>/<filename>`");
		}

		const filename = urlParts.pop();
    
		// remove object from bucket
		return await this.s3Client.send(new DeleteObjectCommand({
			Bucket: this.bucketName,
			Key: filename,
		}));
	}
}

export { AwsBucket };