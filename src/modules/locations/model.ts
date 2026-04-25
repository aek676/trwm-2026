import { t, type UnwrapSchema } from "elysia";

const OpeningTimeSchema = t.Object({
	day: t.String(),
	opening: t.Optional(t.String()),
	closing: t.Optional(t.String()),
	closed: t.Boolean(),
});

export const LocationModel = {
	locationParams: t.Object({
		locationId: t.String({
			pattern: "^[a-fA-F0-9]{24}$",
			error: "Invalid location ID",
		}),
	}),
	createLocationBody: t.Object({
		name: t.String(),
		address: t.Optional(t.String()),
		facilities: t.Optional(t.Array(t.String())),
		coords: t.Optional(
			t.Object({
				type: t.Optional(t.String()),
				coordinates: t.Array(t.Number()),
			}),
		),
		openingTimes: t.Optional(t.Array(OpeningTimeSchema)),
	}),
	updateLocationBody: t.Object({
		name: t.String(),
		address: t.Optional(t.String()),
		rating: t.Number({ minimum: 0, maximum: 5 }),
		facilities: t.Optional(t.Array(t.String())),
		coords: t.Optional(
			t.Object({
				type: t.Optional(t.String()),
				coordinates: t.Array(t.Number()),
			}),
		),
		openingTimes: t.Optional(t.Array(OpeningTimeSchema)),
	}),
} as const;

export type LocationModel = {
	[k in keyof typeof LocationModel]: UnwrapSchema<(typeof LocationModel)[k]>;
};
