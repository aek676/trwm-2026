import { Elysia } from "elysia";
import { othersCtrl, usersCtrl } from "../controllers";
import { locations } from "../modules/locations";
import { reviews } from "../modules/reviews";
import { About, HomeView } from "../views";

export default new Elysia()
	.use(locations)
	.use(reviews)
	.get("/", ({ set }) => {
		set.headers.location = "/locations";
		set.status = 302;
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
