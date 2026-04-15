import { Elysia } from "elysia";
import { locationsApi } from "../modules/locations/api";
import { reviewsApi } from "../modules/reviews/api";

export const apiRoutes = new Elysia({ name: "api-routes" })
	.use(locationsApi)
	.use(reviewsApi);
