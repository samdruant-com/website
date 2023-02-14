import mongoose from "mongoose";

const ImageModel = mongoose.model(
	"image",
	new mongoose.Schema(
		{
			src: { type: String, required: true },
			caption: { type: String },
			order: { type: Number, default: 0 },
		},
		{ timestamps: true }
	)
);

export default {
	ImageModel: ImageModel,
};