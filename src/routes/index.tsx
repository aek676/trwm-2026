import { Elysia } from "elysia";
import { locationCtrl, othersCtrl, usersCtrl } from "../controllers";
import { HomeView } from "../views";

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
