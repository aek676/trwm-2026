import { Elysia } from "elysia";
import { LocationModel } from "./model";
import * as LocationService from "./service";

export const locationsApi = new Elysia({
	name: "locations-api",
	prefix: "/api/locations",
})
	.get("/", async () => {
		const { title, locations } = await LocationService.homeList();
		return { title, locations };
	})
	.get(
		"/:locationId",
		async ({ params }) => {
			const data = await LocationService.locationInfo(params.locationId);
			return data;
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
