import { status } from "elysia";
import { Location } from "../../models";
import type { ReviewModel } from "./model";

export async function addReview(locationId: string) {
	const location = await Location.findById(locationId).lean();

	if (!location) throw status(404, "Location not found");

	return {
		title: "Add review",
		locationId,
		locationName: location.name,
	};
}

export async function doAddReview(
	locationId: string,
	body: ReviewModel["reviewBody"],
) {
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
}
