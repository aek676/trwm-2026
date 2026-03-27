import { Elysia } from "elysia";
import {
	ErrorView,
	LoadingList,
	LocationInfo,
	LocationReviewForm,
} from "../../views";
import { LocationParamsSchema, ReviewBodySchema } from "./model";
import { locationService } from "./service";

export const locations = new Elysia({ name: "locations", prefix: "/locations" })
	.get("/", async () => {
		const { title, locations } = await locationService.homeList();
		return (
			<LoadingList
				title={title}
				pageHeader={{
					title: "LOC8R",
					strapline: "Find places to work with wifi near you!",
				}}
				locations={locations.map((loc) => ({
					id: loc._id.toString(),
					name: loc.name,
					address: loc.address ?? "",
					rating: loc.rating,
					facilities: loc.facilities ?? [],
					distance: "N/A",
				}))}
			/>
		);
	})
	.get(
		"/:locationId",
		async ({ params, set }) => {
			const data = await locationService.locationInfo(params.locationId);
			if (!data) {
				set.status = 404;
				return <ErrorView message="Location not found" status={404} />;
			}

			return (
				<LocationInfo
					title={data.title}
					name={data.name}
					locationId={params.locationId}
					rating={data.rating}
					address={data.address}
					shedule={data.shedule}
					facilities={data.facilities}
					customerReviews={data.customerReviews}
				/>
			);
		},
		{ params: LocationParamsSchema },
	)
	.get(
		"/:locationId/review/new",
		async ({ params, set }) => {
			const data = await locationService.addReview(params.locationId);

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
			await locationService.doAddReview(params.locationId, body);
			set.status = 302;
			set.headers.location = `/locations/${params.locationId}`;
		},
		{
			params: LocationParamsSchema,
			body: ReviewBodySchema,
		},
	);
