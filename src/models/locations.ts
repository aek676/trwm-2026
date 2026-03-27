import { type InferSchemaType, model, Schema } from "mongoose";
import { openingTimeSchema } from "./openingTime";
import { reviewSchema } from "./review";

const locationSchema = new Schema(
	{
		name: { type: String, required: true },
		address: String,
		rating: { type: Number, default: 0, min: 0, max: 5 },
		facilities: [String],
		coords: {
			type: { type: String },
			coordinates: [Number],
		},
		openingTimes: [openingTimeSchema],
		reviews: [reviewSchema],
	},
	{ timestamps: true },
);

locationSchema.index({ coords: "2dsphere" });

export type Location = InferSchemaType<typeof locationSchema>;
export const Location = model("Location", locationSchema);
