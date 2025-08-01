"use server";

import { ObjectId } from "mongodb";
import getClientPromise from "@/lib/mongodb";
import type { Post, PostEdit } from "@/types/posts";

export async function adminPatchPoem(
	id: string,
	updates: Omit<PostEdit, "_id">,
): Promise<{ success: boolean; message?: string }> {
	if (!ObjectId.isValid(id)) {
		return { success: false, message: "Invalid poem ID." };
	}

	try {
		const client = await getClientPromise();
		const db = client.db(process.env.MONGO_DB_NAME);
		const postsCollection = db.collection<Post>("posts");

		const result = await postsCollection.updateOne(
			{ _id: new ObjectId(id) },
			{ $set: updates },
		);

		if (result.matchedCount === 0) {
			return { success: false, message: "Poem not found." };
		}

		return { success: true, message: "Poem updated successfully." };
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error patching poem:", error);
		}
		return { success: false, message: "Failed to update poem." };
	}
}
