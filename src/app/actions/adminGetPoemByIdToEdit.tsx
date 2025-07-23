"use server";

import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import type { Post, PostEdit } from "@/types/posts";

export async function adminGetPoemByIdToEdit(
	id: string,
): Promise<PostEdit | null> {
	if (!ObjectId.isValid(id)) {
		return null;
	}

	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);
		const postsCollection = db.collection<Post>("posts");

		const poemToEdit = await postsCollection.findOne({
			_id: new ObjectId(id),
		});

		if (!poemToEdit) {
			return null;
		}

		return poemToEdit;
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching poem by ID:", error);
		}
		return null;
	}
}
