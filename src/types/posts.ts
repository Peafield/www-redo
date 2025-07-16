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

export type fetchLatestPostsReponse = {
	latest: Post;
	recents: Post[];
};

export type PoemResponse = {
	poem: Post;
	nextPoem: { _id: string; title: string; image_url: string } | null;
	previousPoem: { _id: string; title: string; image_url: string } | null;
};

const BaseCommentSchema = z.object({
	_id: ObjectIdSchema,
	replyToCommentId: ObjectIdSchema.optional(),
	poemId: ObjectIdSchema,
	poemTitle: z.string().optional(),
	author: z.string(),
	content: z.string(),
	date: z.string(),
	status: z.enum(["pending", "approved", "rejected"]),
});

export type Comment = z.infer<typeof BaseCommentSchema> & {
	replies?: Comment[];
};

export const CommentSchema: z.ZodType<Comment> = BaseCommentSchema.extend({
	replies: z.lazy(() => z.array(CommentSchema)).optional(),
});

export const CommentArraySchema = z.array(CommentSchema);

export const CommentCreationSchema = z.object({
	poemId: ObjectIdSchema,
	poemTitle: z.string().optional(),
	replyToCommentId: ObjectIdSchema.optional(),
	author: z
		.string()
		.min(2, { message: "Names must be at least two characters" }),
	content: z
		.string()
		.min(2, { message: "Comments must be at least two characters" }),
	date: z.string(),
	status: z.enum(["pending", "approved", "rejected"]),
});

export type CommentCreation = z.infer<typeof CommentCreationSchema>;
