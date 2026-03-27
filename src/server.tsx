import { html } from "@elysiajs/html";
import openapi from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { Logestic } from "logestic";
import { connectDB } from "./config/db";
import routes from "./routes/index";
import { ErrorView } from "./views";

await connectDB();

const app = new Elysia()
	.use(html())
	.use(Logestic.preset("common"))
	.use(
		staticPlugin({
			assets: "./src/public",
			prefix: "/",
		}),
	)
	.use(routes)
	.onError(({ code, error }) => {
		if (code === "NOT_FOUND") {
			return (
				<ErrorView
					message="Not Found"
					status={404}
					stack={
						process.env.NODE_ENV === "production" ? undefined : error.stack
					}
				/>
			);
		}
		return (
			<ErrorView
				message={error.message}
				status={500}
				stack={process.env.NODE_ENV === "production" ? undefined : error.stack}
			/>
		);
	})
	.listen(3000);

if (process.env.NODE_ENV !== "production") {
	app.use(openapi());
	console.log(
		`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
	);
}
