import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { Logestic } from "logestic";
import routes from "./routes/index";
import { ErrorView } from "./views/ErrorView";

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

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
