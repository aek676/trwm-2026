export function formatDate(isoDate: string): string {
	const date = new Date(isoDate + "T00:00:00");
	return date
		.toLocaleDateString("en-GB", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})
		.replace(/([A-Z])/, (m) => m.toLowerCase());
}
