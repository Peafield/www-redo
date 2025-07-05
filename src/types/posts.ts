import { ObjectId } from "mongodb";
import { z } from "zod";

// Base Post schema
const PostBaseSchema = z.object({
	title: z.string(),
	content: z.string(),
	date: z.string(),
	created_at: z.string(),
});

const ObjectIdSchema = z.instanceof(ObjectId).or(z.string().length(24));

// Post Creation schema
export const PostCreationSchema = PostBaseSchema.partial().extend({
	image: z.instanceof(Blob).optional(),
});

// Post creation type
export type PostCreation = z.infer<typeof PostCreationSchema>;

// Post Insert schema (for MongoDB)
export const PostInsertSchema = PostBaseSchema.extend({
	preview_text: z.string(),
	image_url: z.string(),
});

// Post insert type
export type PostInsert = z.infer<typeof PostInsertSchema>;

// Post schema
export const PostSchema = PostInsertSchema.extend({
	_id: ObjectIdSchema,
});

// Post type
export type Post = z.infer<typeof PostSchema>;

// Post Update schema
export const PostUpdateSchema = PostBaseSchema.partial()
	.merge(PostInsertSchema.partial())
	.merge(PostCreationSchema.partial())
	.extend({
		_id: ObjectIdSchema,
	});

// Post update type
export type PostUpdate = z.infer<typeof PostUpdateSchema>;

// Post array schema
export const PostArraySchema = z.array(PostSchema);
