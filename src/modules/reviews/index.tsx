import { Elysia } from "elysia";
import { LocationReviewForm } from "../../views";
import { LocationModel } from "../locations/model";
import { ReviewModel } from "./model";
import * as ReviewService from "./service";

export const reviews = new Elysia({ name: "reviews", prefix: "/locations" })
	.get(
		"/:locationId/review/new",
		async ({ params }) => {
			const data = await ReviewService.addReview(params.locationId);

			return (
				<LocationReviewForm
					title={data.title}
					locationId={data.locationId}
					locationName={data.locationName}
				/>
			);
		},
		{ params: LocationModel.locationParams },
	)
	.post(
		"/:locationId/review/new",
		async ({ params, body, set }) => {
			await ReviewService.doAddReview(params.locationId, body);
			set.status = 302;
			set.headers.location = `/locations/${params.locationId}`;
		},
		{
			params: ReviewModel.reviewParams,
			body: ReviewModel.reviewBody,
		},
	)
	.put(
		"/:locationId/review/:reviewId",
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
		"/:locationId/review/:reviewId",
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
