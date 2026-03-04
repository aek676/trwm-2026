import { Layout } from "./Layout";

interface ErrorViewProps {
	message: string;
	status?: number;
	stack?: string;
}

export function ErrorView({ message, status, stack }: ErrorViewProps) {
	return (
		<Layout title="Error">
			<div class="container">
				<h1>{message}</h1>
				<h2>{status}</h2>
				<pre>{stack}</pre>
			</div>
		</Layout>
	);
}
