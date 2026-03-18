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
		return <LoadingList title={title} />;
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
