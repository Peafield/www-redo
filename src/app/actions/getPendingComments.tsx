"use server";
import getClientPromise from "@/lib/mongodb";
import { type Comment, CommentArraySchema } from "@/types/posts";

export async function getPendingComments() {
	try {
		const client = await getClientPromise();
		const db = client.db(process.env.MONGO_DB_NAME);
		const commentCollection = db.collection("comments");

		const pendingCommentsData = await commentCollection
			.find({ status: "pending" })
			.sort({ date: "asc" })
			.toArray();

		if (!pendingCommentsData || pendingCommentsData.length === 0) {
			return [];
		}

		const formattedPendingComments: Comment[] = pendingCommentsData.map(
			(comment) => ({
				_id: comment._id.toString(),
				poemId: comment.poemId.toString(),
				poemTitle: comment.poemTitle,
				author: comment.author,
				content: comment.content,
				date: comment.date,
				status: comment.status,
				replies: [],
			}),
		);

		const pendingComments = CommentArraySchema.parse(formattedPendingComments);

		return pendingComments;
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching pending poem comments:", error);
		}
		return null;
	}
}
