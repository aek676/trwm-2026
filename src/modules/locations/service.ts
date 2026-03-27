import { Location } from "../../models";
import type { ReviewBody } from "./model";

const homeList = async () => {
	const locations = await Location.find().lean();
	return { title: "Home", locations };
};

const locationInfo = async (id: string) => {
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

const addReview = async (id: string) => {
	const location = await Location.findById(id).lean();
	if (!location) return null;
	return {
		title: "Add review",
		locationId: id,
		locationName: location.name,
	};
};

const doAddReview = async (id: string, body: ReviewBody) => {
	await Location.findByIdAndUpdate(id, {
		$push: {
			reviews: {
				author: body.name,
				rating: body.rating,
				reviewText: body.review,
				createdOn: new Date(),
			},
		},
	});
};

export const locationService = {
	homeList,
	locationInfo,
	addReview,
	doAddReview,
};
