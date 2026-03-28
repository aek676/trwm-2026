import { Elysia } from "elysia";
import { LoadingList, LocationInfo } from "../../views";
import { LocationModel } from "./model";
import * as LocationService from "./service";

export const locations = new Elysia({ name: "locations", prefix: "/locations" })
	.get("/", async () => {
		const { title, locations } = await LocationService.homeList();
		return (
			<LoadingList
				title={title}
				pageHeader={{
					title: "LOC8R",
					strapline: "Find places to work with wifi near you!",
				}}
				locations={locations}
			/>
		);
	})
	.get(
		"/:locationId",
		async ({ params }) => {
			const data = await LocationService.locationInfo(params.locationId);

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
		{ params: LocationModel.locationParams },
	)
	.post(
		"/",
		async ({ body, set }) => {
			const id = await LocationService.createLocation(body);
			set.status = 201;
			return { id };
		},
		{ body: LocationModel.createLocationBody },
	)
	.put(
		"/:locationId",
		async ({ params, body, set }) => {
			const id = await LocationService.updateLocation(params.locationId, body);
			set.status = 200;
			return { id };
		},
		{
			params: LocationModel.locationParams,
			body: LocationModel.updateLocationBody,
		},
	);
