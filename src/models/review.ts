import { type InferSchemaType, Schema } from "mongoose";

export const reviewSchema = new Schema({
	author: String,
	rating: {
		type: Number,
		required: true,
		min: 0,
		max: 5,
	},
	reviewText: String,
	createdOn: { type: Date, default: Date.now },
});

export type Review = InferSchemaType<typeof reviewSchema>;
