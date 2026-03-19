import { Elysia } from "elysia";
import { locationCtrl, othersCtrl, usersCtrl } from "../controllers";
import {
	About,
	HomeView,
	LoadingList,
	LocationInfo,
	LocationReviewForm,
} from "../views";

export default new Elysia()
	.get("/", () => {
		const { title } = locationCtrl.homeList();
		return (
			<LoadingList
				title={title}
				pageHeader={{
					title: "LOC8R",
					strapline: "Find places to work with wifi near you!",
				}}
				locations={[
					{
						name: "Starcups",
						address: "125 High Street, Reading, RG6 1PS",
						rating: 3,
						facilites: ["Hot drinks", "Food", "Premium wifi"],
						distance: "100m",
					},
					{
						name: "Cafe Hero",
						address: "125 High Street, Reading, RG6 1PS",
						rating: 4,
						facilites: ["Hot drinks", "Food", "Premium wifi"],
						distance: "200m",
					},
					{
						name: "Burger Queen",
						address: "125 High Street, Reading, RG6 1PS",
						rating: 2,
						facilites: ["Food", "Premium wifi"],
						distance: "300m",
					},
				]}
			/>
		);
	})
	.get("/location", () => {
		const { title } = locationCtrl.locationInfo();
		return <LocationInfo title={title} />;
	})
	.get("/location/review/new", () => {
		const { title } = locationCtrl.addReview();
		return <LocationReviewForm title={title} />;
	})
	.get("/about", () => {
		const { title } = othersCtrl.about();
		return <About title={title} />;
	})
	.get("/users", () => {
		const message = usersCtrl.index();
		return <HomeView title={message} />;
	});
