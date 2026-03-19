import { Layout } from "./Layout";

interface AboutProps {
	title: string;
	about: string;
}

export function About({ title, about }: AboutProps) {
	return (
		<Layout title={title}>
			<div class="row banner">
				<div class="col-12">
					<h1>About</h1>
				</div>
				<div class="row">
					<div class="col-12 ">{about}</div>
				</div>
			</div>
		</Layout>
	);
}
