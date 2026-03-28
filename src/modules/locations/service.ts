import { Location } from "../../models";

export const homeList = async () => {
	const locations = await Location.find().lean();
	return {
		title: "Home",
		locations: locations.map((loc) => ({
			id: loc._id.toString(),
			name: loc.name,
			address: loc.address ?? "",
			rating: loc.rating,
			facilities: loc.facilities ?? [],
			distance: "N/A",
		})),
	};
};

export const locationInfo = async (id: string) => {
	const location = await Location.findById(id).lean();
	if (!location) return null;

	return {
		title: "Location Info",
		name: location.name,
		rating: location.rating,
		address: location.address ?? "",
		facilities: location.facilities ?? [],
		shedule: (location.openingTimes ?? []).map((ot) => ({
			days: ot.day,
			opening: ot.opening ?? undefined,
			closing: ot.closing ?? undefined,
			isClosed: ot.closed,
		})),
		customerReviews: (location.reviews ?? []).map((r) => ({
			name: r.author ?? "Anonymous",
			rating: r.rating,
			date: r.createdOn
				? new Date(r.createdOn).toISOString().split("T")[0]
				: "",
			review: r.reviewText ?? "",
		})),
	};
};
