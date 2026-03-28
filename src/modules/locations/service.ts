import { status } from "elysia";
import { Location } from "../../models";
import type { LocationModel } from "./model";

export async function homeList() {
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
}

export async function locationInfo(id: string) {
	const location = await Location.findById(id).lean();
	if (!location) throw status(404, "Location not found");

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
}

export async function createLocation(
	data: LocationModel["createLocationBody"],
) {
	const location = await Location.create(data);
	return location._id.toString();
}

export async function updateLocation(
	id: string,
	data: LocationModel["updateLocationBody"],
) {
	const location = await Location.findByIdAndUpdate(id, data, {
		new: true,
	}).lean();

	if (!location) throw status(404, "Location not found");

	return location._id.toString();
}
