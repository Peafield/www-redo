"use server";
import getClientPromise from "@/lib/mongodb";
import { type Comment, CommentArraySchema } from "@/types/posts";

export async function getPoemCommentsbyId(id: string) {
	try {
		const client = await getClientPromise();
		const db = client.db(process.env.MONGO_DB_NAME);
		const commentCollection = db.collection("comments");

		const allPoemComments = await commentCollection
			.find({ poemId: id, status: "approved" })
			.sort({ date: "asc" })
			.toArray();

		if (!allPoemComments || allPoemComments.length === 0) {
			return [];
		}

		const commentMap = new Map<string, Comment>();
		const rootComments: Comment[] = [];

		const formattedComments: Comment[] = allPoemComments.map((comment) => ({
			_id: comment._id.toString(),
			poemId: comment.poemId.toString(),
			replyToCommentId: comment.replyToCommentId?.toString(),
			author: comment.author,
			content: comment.content,
			date: comment.date,
			status: comment.status,
			replies: [],
		}));

		for (const comment of formattedComments) {
			commentMap.set(comment._id as string, comment);
		}

		for (const comment of formattedComments) {
			if (comment.replyToCommentId) {
				const parent = commentMap.get(comment.replyToCommentId as string);
				if (parent) {
					parent.replies?.push(comment);
				}
			} else {
				rootComments.push(comment);
			}
		}
		const sortedRootComments = rootComments.reverse();

		const validatedComments = CommentArraySchema.parse(sortedRootComments);
		return validatedComments;
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching poem comments:", error);
		}
		return null;
	}
}
