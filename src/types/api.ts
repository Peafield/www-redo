import { z } from "zod";

export const ApiResponseSchema = z.object({
	statusCode: z.number(),
	message: z.string().optional(),
	error: z.string().optional(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export const createActionResponseSchema = <T extends z.ZodType>(
	dataSchema: T,
) =>
	z.object({
		success: z.boolean(),
		message: z.string(),
		data: dataSchema.optional(),
		error: z.string().optional(),
	});

export const ActionResponseSchema = createActionResponseSchema(z.any());

export type ActionResponse<T = unknown> = {
	success: boolean;
	message: string;
	data?: T;
	error?: string;
};
