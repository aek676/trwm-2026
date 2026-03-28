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

export async function updateReview(
	locationId: string,
	reviewId: string,
	body: ReviewModel["updateReviewBody"],
) {
	const location = await Location.findOneAndUpdate(
		{ _id: locationId, "reviews._id": reviewId },
		{
			$set: {
				"reviews.$.author": body.name,
				"reviews.$.rating": body.rating,
				"reviews.$.reviewText": body.review,
			},
		},
		{ new: true },
	).lean();
	if (!location) throw status(404, "Location or review not found");
	return location._id.toString();
}

export async function deleteReview(locationId: string, reviewId: string) {
	const location = await Location.findOneAndUpdate(
		{ _id: locationId },
		{ $pull: { reviews: { _id: reviewId } } },
		{ new: true },
	).lean();
	if (!location) throw status(404, "Location not found");
	return location._id.toString();
}
