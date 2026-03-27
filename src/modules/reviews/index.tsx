import { Elysia } from "elysia";
import { ErrorView, LocationReviewForm } from "../../views";
import { LocationParamsSchema } from "../locations/model";
import { ReviewBodySchema } from "./model";
import * as reviewService from "./service";

export const reviews = new Elysia({ name: "reviews", prefix: "/locations" })
	.get(
		"/:locationId/review/new",
		async ({ params, set }) => {
			const data = await reviewService.addReview(params.locationId);

			if (!data) {
				set.status = 404;
				return <ErrorView message="Location not found" status={404} />;
			}

			return (
				<LocationReviewForm
					title={data.title}
					locationId={data.locationId}
					locationName={data.locationName}
				/>
			);
		},
		{ params: LocationParamsSchema },
	)
	.post(
		"/:locationId/review/new",
		async ({ params, body, set }) => {
			await reviewService.doAddReview(params.locationId, body);
			set.status = 302;
			set.headers.location = `/locations/${params.locationId}`;
		},
		{
			params: LocationParamsSchema,
			body: ReviewBodySchema,
		},
	);
