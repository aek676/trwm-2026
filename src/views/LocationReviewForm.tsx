import { Layout } from "./Layout";

interface LocationInfoProps {
	title: string;
}

export function LocationReviewForm({ title }: LocationInfoProps) {
	return (
		<Layout title={title}>
			<h1>Review Star</h1>
		</Layout>
	);
}
