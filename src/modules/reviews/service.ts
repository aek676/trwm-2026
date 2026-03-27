import { Location } from "../../models";
import type { ReviewBody } from "./model";

export const addReview = async (locationId: string) => {
	const location = await Location.findById(locationId).lean();
	if (!location) return null;
	return {
		title: "Add review",
		locationId,
		locationName: location.name,
	};
};

export const doAddReview = async (locationId: string, body: ReviewBody) => {
	await Location.findByIdAndUpdate(locationId, {
		$push: {
			reviews: {
				author: body.name,
				rating: body.rating,
				reviewText: body.review,
				createdOn: new Date(),
			},
		},
	});
};
