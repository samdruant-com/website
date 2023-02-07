import Joi from "joi";

const ImageSchema = Joi.object({
	url: Joi.string().required(),
	caption: Joi.string(),
	order: Joi.number(),
});

const ProjectSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string(),
	publish: Joi.boolean(),
	images: Joi.array().items(ImageSchema),
});

const AboutSchema = Joi.object({
	bio: Joi.string().required(),
	image: Joi.string().allow(null),
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
	validateProject(project) {
		return validate(project, ProjectSchema);
	},
	validateAbout(about) {
		return validate(about, AboutSchema);
	},
	validateAdmin(admin) {
		return validate(admin, AdminSchema);
	},
};
