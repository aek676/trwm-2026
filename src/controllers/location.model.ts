import { t } from "elysia";

export const LocationParamsSchema = t.Object({
	id: t.String(),
});

export const ReviewBodySchema = t.Object({
	name: t.String(),
	rating: t.Numeric({ minimum: 1, maximum: 5 }),
	review: t.String(),
});

export type ReviewBody = typeof ReviewBodySchema.static;
