import { Elysia } from "elysia";
import { LocationModel } from "../locations/model";
import { ReviewModel } from "./model";
import * as ReviewService from "./service";

export const reviewsApi = new Elysia({
	name: "reviews-api",
	prefix: "/api/locations",
})
	.get(
		"/:locationId/reviews",
		async ({ params }) => {
			const location = await ReviewService.addReview(params.locationId);
			return location;
		},
		{ params: LocationModel.locationParams },
	)
	.post(
		"/:locationId/reviews",
		async ({ params, body, set }) => {
			await ReviewService.doAddReview(params.locationId, body);
			set.status = 201;
			return { success: true };
		},
		{
			params: ReviewModel.reviewParams,
			body: ReviewModel.reviewBody,
		},
	)
	.put(
		"/:locationId/reviews/:reviewId",
		async ({ params, body, set }) => {
			const id = await ReviewService.updateReview(
				params.locationId,
				params.reviewId,
				body,
			);
			set.status = 200;
			return { id };
		},
		{
			params: ReviewModel.reviewWithIdParams,
			body: ReviewModel.updateReviewBody,
		},
	)
	.delete(
		"/:locationId/reviews/:reviewId",
		async ({ params, set }) => {
			const id = await ReviewService.deleteReview(
				params.locationId,
				params.reviewId,
			);
			set.status = 200;
			return { id };
		},
		{ params: ReviewModel.reviewWithIdParams },
	);
