import Joi from "joi";

const ImageSchema = Joi.object({
	src: Joi.string().required(),
	caption: Joi.string(),
	order: Joi.number(),
});

const WorkSchema = Joi.object({
	name: Joi.string().required(),
	date: Joi.string(),
	description: Joi.string(),
	images: Joi.array().items(ImageSchema),
});

const UserSchema = Joi.object({
	name: Joi.string().required(),
	bio: Joi.string().required(),
	email: Joi.string().allow(null),
	links: Joi.array().items(Joi.object({
		label: Joi.string().required(),
		url: Joi.string().required(),
	})),
	image: ImageSchema,
});

const AdminSchema = Joi.object({
	email: Joi.string().required(),
	password: Joi.string().required(),
});

/**
 *
 * @param {any} object
 * @param {Joi.ObjectSchema} schema
 * @returns {Joi.ValidationResult} result
 */
function validate(object, schema) {
	// validate schema and allow unknowns
	return schema.validate(object, { allowUnknown: true });
}

export default {
	validateImage(image) {
		return validate(image, ImageSchema);
	},
	validateWork(work) {
		return validate(work, WorkSchema);
	},
	validateUser(user) {
		return validate(user, UserSchema);
	},
	validateAdmin(admin) {
		return validate(admin, AdminSchema);
	},
};
