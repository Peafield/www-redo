"use server";

import clientPromise from "@/lib/mongodb";
import { CommentArraySchema } from "@/types/posts";

export async function getPoemCommentsbyId(id: string) {
	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);
		const commentCollection = db.collection("comments");

		const poemComments = await commentCollection
			.find({ poemId: id, status: "approved" })
			.sort({ date: -1 })
			.toArray();

		if (!poemComments) {
			return [];
		}

		const formattedComments = poemComments.map((comment) => ({
			...comment,
			_id: comment._id.toString(),
			poemId: comment.poemId.toString(),
		}));

		const validatedComments = CommentArraySchema.parse(formattedComments);
		return validatedComments;
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching poem comments:", error);
		}
		return null;
	}
}
