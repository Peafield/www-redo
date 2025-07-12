"use server";

import clientPromise from "@/lib/mongodb";
import { type CommentCreation, CommentCreationSchema } from "@/types/posts";

type SubmitCommentActionResult = {
	success: boolean;
	message?: string;
	errors?: {
		author?: string[];
		content?: string[];
	};
	error?: string;
	comment?: CommentCreation;
};

// TODO: add rate limiting to comment submission with REDIS.

export async function submitCommentAction(
	_prevState: SubmitCommentActionResult | null,
	formData: FormData,
): Promise<SubmitCommentActionResult> {
	// Basic honeypot for spam
	if (formData.get("honeypot")) {
		return { success: true, message: "Comment submitted successfully!" };
	}
	const rawCommentData = {
		poemId: formData.get("poemId"),
		author: formData.get("author"),
		content: formData.get("comment"),
		date: new Date().toISOString(),
		status: "pending",
	};

	const validatedComment = CommentCreationSchema.safeParse(rawCommentData);

	if (!validatedComment.success) {
		if (process.env.NODE_ENV === "development") {
			console.error("Invalid comment data:", validatedComment.error);
		}
		return {
			success: false,
			message: "Invalid comment data",
			errors: validatedComment.error.flatten().fieldErrors,
		};
	}

	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);
		const commentCollection = db.collection<CommentCreation>("comments");

		const result = await commentCollection.insertOne(validatedComment.data);

		const insertedComment = await commentCollection.findOne({
			_id: result.insertedId,
		});

		if (!insertedComment) {
			return {
				success: false,
				message: "Failed to insert comment into database",
				error: "Failed to insert comment into database",
			};
		}

		const plainCommentObject = {
			_id: insertedComment._id.toString(),
			poemId: insertedComment.poemId.toString(),
			author: insertedComment.author,
			content: insertedComment.content,
			date: insertedComment.date,
			status: insertedComment.status,
		};

		return {
			success: true,
			comment: plainCommentObject,
		};
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error submitting comment:", error);
		}
		return {
			success: false,
			message: "Error submitting comment",
			error: "Error submitting comment",
		};
	}
}
