import { z } from "zod";

export const UserSchema = z.object({
	isLoggedIn: z.boolean(),
});

export type User = z.infer<typeof UserSchema>;
