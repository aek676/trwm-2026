import { Elysia } from "elysia";
import { ErrorView, LoadingList, LocationInfo } from "../../views";
import { LocationParamsSchema } from "./model";
import * as locationService from "./service";

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
	);
