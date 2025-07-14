"use server";

import clientPromise from "@/lib/mongodb";
import { CommentArraySchema } from "@/types/posts";

export async function getPoemCommentsbyId(id: string) {
	try {
		const client = await clientPromise;
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

		const formattedComments = allPoemComments.map((comment) => ({
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
			commentMap.set(comment._id, comment);
		}

		// Second, build the tree structure
		for (const comment of formattedComments) {
			if (comment.replyToCommentId) {
				const parent = commentMap.get(comment.replyToCommentId);
				if (parent) {
					// It's a reply, push it into its parent's replies array
					parent.replies?.push(comment);
				}
			} else {
				// It's a top-level comment
				rootComments.push(comment);
			}
		}

		// 3. Reverse the root comments to show newest first on the page
		const sortedRootComments = rootComments.reverse();

		const validatedComments = CommentArraySchema.parse(formattedComments);
		return validatedComments;
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching poem comments:", error);
		}
		return null;
	}
}
