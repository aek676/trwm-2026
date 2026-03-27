import { type InferSchemaType, Schema } from "mongoose";

export const openingTimeSchema = new Schema({
	day: { type: String, required: true },
	opening: String,
	closing: String,
	closed: {
		type: Boolean,
		required: true,
	},
});

export type OpeningTime = InferSchemaType<typeof openingTimeSchema>;
