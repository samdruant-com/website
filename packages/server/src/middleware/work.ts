import { 
	BUCKET_S3_URI, 
	BUCKET_NAME,
	BUCKET_S3_KEY,
	BUCKET_S3_SECRET,
	BUCKET_S3_REGION
} from "../config/env";
import * as WorkData from "../data/work";
import { AwsBucket } from "../utils/storage";
import { createErrorResponse } from "./helpers/error";
import type { IImage } from "../types";
import type { AuthenticatedRequest } from "./helpers/types";
import type { Request, Response } from "express";
import type { GenericBucket } from "../utils/storage";

// is like IImage but with a `file` property instead of `src`
interface RawImage extends Omit<IImage, 'src'> {
  file?: Express.Multer.File;
  src?: string;
}

/**
 * Returns a list of images with the `src` property set to the url of the image.
 * If the image is new, the `file` property is used to upload the image to the
 * bucket and the `src` property is set to the url of the uploaded image. If the
 * image is old, the `src` property is used as is.
 */
async function _uploadImages(rawImages: RawImage[]): Promise<IImage[]> {
	if(!BUCKET_NAME) {
		throw new Error('Bucket name missing. Set BUCKET_NAME environment variable');
	}

	if(!BUCKET_S3_KEY) {
		throw new Error('Bucket key missing. Set BUCKET_KEY environment variable');
	}

	if(!BUCKET_S3_SECRET) {
		throw new Error('Bucket secret missing. Set BUCKET_SECRET environment variable');
	}

	if (!BUCKET_S3_URI) {
		throw new Error('Bucket URI missing. Set BUCKET_S3_URI environment variable');
	}

	if (!BUCKET_S3_REGION) {
		throw new Error('Bucket region missing. Set BUCKET_S3_REGION environment variable');
	}

	const bucket: GenericBucket = new AwsBucket({ 
		bucketEndpoint: BUCKET_S3_URI, 
		accessKeyId: BUCKET_S3_KEY, 
		secretAccessKey: BUCKET_S3_SECRET, 
		bucketName: BUCKET_NAME, 
		bucketRegion: BUCKET_S3_REGION
	});
  
	const images: IImage[] = [];

	try {
		for(let i = 0; i < rawImages.length; i++){
			const image = rawImages[i];

			// upload file if it exists, otherwise use the src
			const src = image.file ? await bucket.uploadFile(image.file) : image.src as string;

			images.push({
				src,
				caption: image.caption
			} as IImage);
		}
	} catch (error) {
		// delete any image that is in the `images` list AND has a file property in the `rawImages` list 
		for(let i = 0; i < rawImages.length; i++){
			const rawImage = rawImages[i];
			const image = images.find((image) => image.src === rawImage.src);

			if(image){
				await bucket.removeFile(image.src);
			}
		}

		throw error;
	}

	return images;
}

/**
 * Returns a list of images with the `src` property set to the url of the image.
 */
async function _processRequestImages(req: Request): Promise<IImage[]> {
	/**
   * Extract new and old images from the request.
   * 
   * New images are stored such that each image, based on its index, has three
   * properties:
   * - image-0-file - the image file
   * - image-0-caption - the caption of the image
   * - image-0-place - the place where the image was taken
   * 
   * Existing images are stored such that each image, based on its index, has three
   * properties:
   * - image-0-src - the image src
   * - image-0-caption - the caption of the image
   */
	const newImages = (req.files as Express.Multer.File[]).map((file) => {
		const [, index] = file.fieldname.split('-');
		
		return {
			src: file.path,
			file,
			caption: req.body[`image-${index}-caption`]
		} as RawImage;
	});

	const oldImages = Object.keys(req.body)
		.filter((key) => key.includes('src'))
		.map((key) => {
			const [, index] = key.split('-');

			return {
				src: req.body[key],
				caption: req.body[`image-${index}-caption`]
			} as RawImage;
		});

	const rawImages: RawImage[] = [...newImages, ...oldImages];

	return await _uploadImages(rawImages);
}

async function postWork(req: AuthenticatedRequest, res: Response) {
	try {
		// extract images from request
		const images: IImage[] = await _processRequestImages(req);

		const work = await WorkData.createWork({ ...req.body, images });
		return res.status(201).send(work);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function getWork(req: Request | AuthenticatedRequest, res: Response) {
	const id = req.params.id;
  
	try {
		const work = (req as AuthenticatedRequest).user 
			? await WorkData.getWork(id, { showHidden: true }) 
			: await WorkData.getWork(id);
      
		return res.status(200).send(work);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function indexWorks(req: Request | AuthenticatedRequest, res: Response) {
	try {
		const works = (req as AuthenticatedRequest).user 
			? await WorkData.indexWorks({ showHidden: true })
			: await WorkData.indexWorks();
		return res.status(200).send(works);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function patchWork(req: AuthenticatedRequest, res: Response) {
	const id = req.params.id;

	try {
		const images: IImage[] = await _processRequestImages(req);
		const works = await WorkData.updateWork(id, { ...req.body, images });
		return res.status(200).send(works);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function deleteWork(req: AuthenticatedRequest, res: Response) {
	const id = req.params.id;

	try {
		const works = await WorkData.deleteWork(id);
		return res.status(203).send(works);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

export { postWork, getWork, indexWorks, patchWork, deleteWork };
