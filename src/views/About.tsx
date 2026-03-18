import { Layout } from "./Layout";

interface AboutProps {
	title: string;
}

export function About({ title }: AboutProps) {
	return (
		<Layout title={title}>
			<div class="row banner">
				<div class="col-12">
					<h1>About</h1>
				</div>
				<div class="row">
					<div class="col-12 ">
						Loc8r was created to help people find places to sit down and get a
						bit of work done.
					</div>
				</div>
			</div>
		</Layout>
	);
}
