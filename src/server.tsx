import { html } from "@elysiajs/html";
import openapi from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { Logestic } from "logestic";
import { connectDB } from "./config/db";
import { apiRoutes } from "./routes/api";
import { serverRoutes } from "./routes/server";
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
	.use(serverRoutes)
	.use(apiRoutes)
	.use((app) =>
		process.env.NODE_ENV !== "production" ? app.use(openapi()) : app,
	)
	.onError(({ path, code, error, status }) => {
		if (path.startsWith("/api/")) {
			if (code === "VALIDATION") {
				return status(400, error.customError || error.all[0].message);
			}

			return status(code, error.message);
		}

		if (typeof code === "number") {
			return (
				<ErrorView
					message={error.response}
					status={code}
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
