import * as WorkData from "../data/work";
import { BasicBucket } from "../utils/storage";
import { BUCKET_S3_URI } from "../config/env";
import { createErrorResponse } from "./helpers/error";
import type { IImage } from "../types";
import type { AuthenticatedRequest } from "./helpers/types";
import type { Request, Response } from "express";

// is like IImage but with a `file` property instead of `src`
interface RawImage extends Omit<IImage, 'src'> {
  file?: Express.Multer.File;
  src?: string;
}

/**
 * Extract new and old images from the request.
 * 
 * New images are stored such that each image, based on its index, has three
 * properties:
 * - image-0-file - the image file
 * - image-0-photographer - the photographer of the image
 * - image-0-place - the place where the image was taken
 * 
 * Existing images are stored such that each image, based on its index, has three
 * properties:
 * - image-0-src - the image src
 * - image-0-photographer - the photographer of the image
 * - image-0-place - the place where the image was taken
 */
function _extractWorkImages(req: Request): RawImage[] {
	const newImages = (req.files as Express.Multer.File[]).map((file) => {
		const [, index] = file.fieldname.split('-');
		const photographer = req.body[`image-${index}-photographer`];
		const place = req.body[`image-${index}-place`];

		return {
			src: file.path,
			file,
			photographer,
			place
		} as RawImage;
	});

	const oldImages = Object.keys(req.body).filter((key) => key.includes('src')).map((key) => {
		const [, index] = key.split('-');
		const src = req.body[key];
		const photographer = req.body[`image-${index}-photographer`];
		const place = req.body[`image-${index}-place`];

		return {
			src,
			photographer,
			place
		} as RawImage;
	});

	return [...newImages, ...oldImages];
}

/**
 * Returns a list of images with the `src` property set to the url of the image.
 * If the image is new, the `file` property is used to upload the image to the
 * bucket and the `src` property is set to the url of the uploaded image. If the
 * image is old, the `src` property is used as is.
 */
async function _processImages(rawImages: RawImage[]): Promise<IImage[]> {
	if(!BUCKET_S3_URI || BUCKET_S3_URI === ''){
		throw new Error('S3 bucket uri not set');
	}
  
	const bucket = new BasicBucket({ endpoint: BUCKET_S3_URI });
	const images: IImage[] = [];

	try {
		for(let i = 0; i < rawImages.length; i++){
			const image = rawImages[i];

			// upload file if it exists, otherwise use the src
			const src = image.file ? await bucket.uploadFile(image.file) : image.src as string;

			images.push({
				src,
				photographer: image.photographer,
				place: image.place
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
	const rawImages: RawImage[] = _extractWorkImages(req);
	return await _processImages(rawImages);
}

async function postWork(req: Request, res: Response) {
	try {
		// extract images from request
		const images: IImage[] = await _processRequestImages(req);

		const works = await WorkData.createWork({ ...req.body, images });
		return res.status(201).send(works);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function getWork(req: Request, res: Response) {
	const id = req.params.id;
  
	try {
		const works = await WorkData.getWork(id);
      
		return res.status(200).send(works);
	} catch (error) {
		return createErrorResponse(res, (error as Error).message, 400);
	}
}

async function indexWorks(req: Request, res: Response) {
	try {
		const works = await WorkData.indexWorks();
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
