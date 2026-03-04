import { Elysia } from "elysia";
import locationCtrl from "../controllers/location";
import othersCtrl from "../controllers/others";
import usersCtrl from "../controllers/users";
import { HomeView } from "../views/HomeView";

export default new Elysia()
	.get("/", () => {
		const { title } = locationCtrl.homeList();
		return <HomeView title={title} />;
	})
	.get("/location", () => {
		const { title } = locationCtrl.locationInfo();
		return <HomeView title={title} />;
	})
	.get("/location/review/new", () => {
		const { title } = locationCtrl.addReview();
		return <HomeView title={title} />;
	})
	.get("/about", () => {
		const { title } = othersCtrl.about();
		return <HomeView title={title} />;
	})
	.get("/users", () => {
		const message = usersCtrl.index();
		return <HomeView title={message} />;
	});
