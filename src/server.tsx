import { html } from "@elysiajs/html";
import openapi from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { Logestic } from "logestic";
import { connectDB } from "./config/db";
import routes from "./routes/index";
import { ErrorView } from "./views";

const port = Bun.env.PORT ? Number(Bun.env.PORT) : 3000;
if (Number.isNaN(port) || port < 1 || port > 65535) {
	console.error(`Invalid PORT: ${Bun.env.PORT}`);
	process.exit(1);
}

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
	.use((app) =>
		process.env.NODE_ENV !== "production" ? app.use(openapi()) : app,
	)
	.onError(({ code, error, status }) => {
		if (typeof code === "number") {
			const message =
				"response" in error ? String(error.response) : error.message;

			return status(
				code,
				<ErrorView
					message={message}
					status={code}
					stack={
						process.env.NODE_ENV === "production" ? undefined : error.stack
					}
				/>,
			);
		}

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
	});

app.listen(port);

if (process.env.NODE_ENV !== "production") {
	console.log(
		`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
	);
}
