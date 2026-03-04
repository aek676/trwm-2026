import { Layout } from "./Layout";

interface HomeViewProps {
	title: string;
}

export function HomeView({ title }: HomeViewProps) {
	return (
		<Layout title={title}>
			<div class="container">
				<h1>{title}</h1>
				<p>Bienvenido a {title}</p>
			</div>
		</Layout>
	);
}
