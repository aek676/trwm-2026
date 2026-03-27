import { Elysia } from "elysia";
import { locationCtrl, othersCtrl, usersCtrl } from "../controllers";
import {
	About,
	ErrorView,
	HomeView,
	LoadingList,
	LocationInfo,
	LocationReviewForm,
} from "../views";

export default new Elysia()
	.get("/", async () => {
		const { title, locations } = await locationCtrl.homeList();
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
					distance: "N/A", // TODO: calculate from coords
				}))}
			/>
		);
	})
	.get("/location/:id", async ({ params, set }) => {
		const data = await locationCtrl.locationInfo(params.id);
		if (!data) {
			set.status = 404;
			return <ErrorView message="Location not found" status={404} />;
		}

		return (
			<LocationInfo
				title={data.title}
				name={data.name}
				rating={data.rating}
				address={data.address}
				shedule={data.shedule}
				facilities={data.facilities}
				customerReviews={data.customerReviews}
			/>
		);
	})
	.get("/location/review/new", () => {
		const { title } = locationCtrl.addReview();
		return <LocationReviewForm title={title} />;
	})
	.get("/about", () => {
		const { title } = othersCtrl.about();
		return (
			<About
				title={title}
				about={
					"Loc8r was created to help people find places to sit down and get a bit of work done."
				}
			/>
		);
	})
	.get("/users", () => {
		const message = usersCtrl.index();
		return <HomeView title={message} />;
	});
