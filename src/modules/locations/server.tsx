import { Elysia } from "elysia";
import { LoadingList, LocationInfo } from "../../views";
import { LocationModel } from "./model";
import * as LocationService from "./service";

export const locations = new Elysia({
	name: "locations-server",
	prefix: "/locations",
})
	.get("/", async () => {
		const { title, locations: locs } = await LocationService.homeList();
		return (
			<LoadingList
				title={title}
				pageHeader={{
					title: "LOC8R",
					strapline: "Find places to work with wifi near you!",
				}}
				locations={locs}
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
	);
