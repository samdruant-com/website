import mongoose from "mongoose";
import SchemaLogic from "../logic/SchemaLogic.js";
import ImageData from "./ImageData.js";
import BucketService from "../services/BucketService/index.js";
import { GeneralError } from "../logic/ErrorLogic.js";

/**
 * @typedef {object} image
 * @property {string} src - url to image
 * @property {string} caption - image caption
 * @property {number} order - image order
 */

/**
 * @typedef {object} work
 * @property {string} name - work name
 * @property {string} date - work date
 * @property {string} description - size, material, etc.
 * @property {image[]} images - work images
 */

const WorkModel = mongoose.model(
	"work",
	new mongoose.Schema(
		{
			name: { type: String, required: true },
			slug: { type: String, unique: true },
			date: { type: String },
			description: { type: String },
			images: [ImageData.ImageModel.schema],
		},
		{ timestamps: true }
	));


// create a hook that deletes all images in a work when a work is deleted
WorkModel.schema.pre("remove", async function(next) {
	const work = this;
  
	// delete all images from work
	work.images.forEach(async(image) => {
		await BucketService.remove(image.src);
	});
  
	next();
});

/**
 * Returns true if images are equal
 *
 * @param {object[]} imagesA
 * @param {object[]} imagesB
 * @returns {boolean} boolean
 */
function imagesAreEqual(imagesA, imagesB){
	if(imagesA.length !== imagesB.length){
		return false;
	}

	// compare images
	for(let i = 0; i < imagesA.length; i++){
		if(imagesA[i].src !== imagesB[i].src){
			return false;
		}
	}

	return true;
}

/**
 * returns a list of images that are in the sample of images but not in the benchmark
 *  
 * @param {image[]} benchmarkImages - images to compare against
 * @param {image[]} sampleImages - a sample of images
 * @returns {image[]} images
 */
function getMissingImages(benchmarkImages, sampleImages){
	const missingImages = [];
		
	benchmarkImages.forEach((image) => {
		// get index of old work in the patch
		const index = sampleImages.findIndex((x) => x._id === image._id);

		// remove all images of a work if it is not in the new/updated work
		if (index === -1) {
			missingImages.push(image);
		}
	});

	return missingImages;
}

/**
 * Returns a unique slug
 * 
 * @param {string} name
 * @returns {Promise<string>} slug
 */
async function getSlug(name){
	if(!name || name.trim().length === 0){
		throw new GeneralError("name is required", 400);
	}

	let slug = name.toLowerCase();
	// replace all spaces with dashes
	slug = slug.replace(/ /g, "-");
	// remove all non-alphanumeric characters except dashes
	slug = slug.replace(/[^a-z0-9-]/g, "");
  
	let unique = false;
	
	let i = 0;
	// check if slug is unique
	while(!unique){
		const index = i > 0 ? `-${i}` : "";
		slug = slug + index;
		const query = { slug };
		const doc = await WorkModel.findOne(query).exec();
    
		// exit loop if slug is unique
		if(!doc){
			unique = true;
		}

		i++;
	}

	return slug;
}

export default {
	WorkModel,

	/**
	 * Creates new work
	 *
	 * @param {object} params
	 * @param {string} params.name
	 * @param {string} params.date
	 * @param {string} params.description
	 * @param {image[]} params.images
	 * @param {boolean} params.publish
	 * @returns {Promise<mongoose.Document>} work
	 */
	async createWork({ name, date, description, images, publish } = {}) {
		const request = {
			name: name,
			date: date,
			description: description,
			images: images,
			publish: publish,
			slug: await getSlug(name) // get unique slug
		};

		const valid = SchemaLogic.validateWork(request);

		if (valid.error) {
			throw new GeneralError(valid.error.message, 400);
		}

		return await this.WorkModel.create(new this.WorkModel(request));
	},

	/**
	 * Gets work with given id
	 *
	 * @param {string} id - work id
	 * @param {boolean} showHidden
	 * @returns {Promise<mongoose.Document>} work
	 */
	async getWork(id, showHidden = false) {
		const filter = showHidden ? { _id: id } : { _id: id, publish: true };
		const work = await this.WorkModel.findOne(filter);

		if (!work) {
			throw new GeneralError(`Work not found {id: ${id}}`, 404);
		}

		return work;
	},

	/**
	 * Gets work with slugs
	 *
	 * @param {string} slug - work slug
	 * @param {boolean} showHidden
	 * @returns {Promise<mongoose.Document>} work
	 */
	async getWorkBySlug(slug, showHidden = false) {
		const filter = showHidden ? { slug } : { slug, publish: true };
		const work = await this.WorkModel.findOne(filter);

		if (!work) {
			throw new GeneralError(`Work not found {slug: ${slug}}`, 404);
		}

		return work;
	},

	/**
	 * @typedef {object} index
	 * @property {mongoose.Document[]} works - list of works
	 * @property {number} worksNum - total number of works
	 * @property {number} currPage - current page
	 * @property {number} pagesNum - total number of pages
	 */

	/**
	 * Gets all works
	 *
	 * @param {object} config
	 * @param {boolean} [config.showHidden]
	 * @param {number} [config.page]
	 * @param {number} [config.limit]
	 * @returns {Promise<index>} index of works
	 */
	async indexWorks({ 
		showHidden = false,
		page = 1,
		limit = 10,
	} = {}) {
		const filter = showHidden ? { publish: true } : {} ;
		const works = await this.WorkModel
			.find(filter)
			.limit(limit > 0 ? limit : 0) // if limit is <= 0, then return all products
			.skip(page > 0 ? (page - 1) * limit : 0); // if page is <= 0, then return all products

		// get total number of products
		const total = await this.WorkModel.countDocuments(filter);

		// get total number of pages
		const totalPages = Math.ceil(total / limit);
    
		return {
			works,
			worksNum: total,
			currPage: page,
			pagesNum: totalPages,
		};
	},

	/**
	 *
	 * @param {string} id - work id
	 * @param {object} config
	 * @param {string} [config.name]
	 * @param {string} [config.date]
	 * @param {string} [config.description]
	 * @param {image[]} [config.images]
	 * @param {boolean} [config.publish]
	 * @returns {Promise<mongoose.Document>} work
	 */
	async updateWork(id, { name, date, description, images, publish } = {}) {
		const work = await this.getWork(id, true);

		const patch = {
			name: name || work.name,
			date: date || work.date,
			description: description || work.description,
			images: images || work.images,
			publish: publish || work.publish,
		};

		const valid = SchemaLogic.validateWork(patch);
		if (valid.error) {
			throw new GeneralError(valid.error.message, 400);
		}

		// update slug if name is different
		const newName = name?.trim().toLowerCase();
		const oldName = work?.name?.trim().toLowerCase();
		if(name && newName !== oldName){
			patch.slug = await getSlug(name);
		}

		const diffImages = !imagesAreEqual(images, work.images);

		try {
			// check if images are different
			if(images && diffImages === true){
				// get copy of embedded images
				const workImages = JSON.parse(JSON.stringify(work.images));
				// get all images that are not in the new/updated work
				const imagesToRemove = getMissingImages(workImages, images);
				
				// get the src of all images in the new/updated work
				imagesToRemove.forEach(async(image) => {
					await BucketService.remove(image.src);
				});
			}

			// update work
			return await work.updateOne(patch).exec();
		}
		catch (error) {
			if(images && diffImages){
				// get all images that are not in the new/updated work
				const imagesToRemove = getMissingImages(images, work.images);
        
				// remove all images that are not in the new/updated work
				imagesToRemove.forEach(async(image) => {
					await BucketService.remove(image.src);
				});
			}

			throw error;
		}
	},

	/**
	 *
	 * @param {string} id - work id
	 * @returns {Promise<mongoose.Document>} work
	 */
	async deleteWork(id) {
		const work = await this.getWork(id, true);
		return await work.remove();
	},
};
