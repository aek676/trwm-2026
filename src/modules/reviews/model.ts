import { t, type UnwrapSchema } from "elysia";

export const ReviewModel = {
	reviewParams: t.Object({ locationId: t.String() }),
	reviewBody: t.Object({
		name: t.String(),
		rating: t.Numeric({ minimum: 1, maximum: 5 }),
		review: t.String(),
	}),
} as const;

export type ReviewModel = {
	[k in keyof typeof ReviewModel]: UnwrapSchema<(typeof ReviewModel)[k]>;
};
