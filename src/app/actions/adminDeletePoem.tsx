"use server";

import { ObjectId } from "mongodb";
import { env } from "@/env";
import clientPromise from "@/lib/mongodb";

export default async function deletePoem(poemId: string) {
	try {
		const client = await clientPromise;
		const db = client.db(env.MONGO_DB_NAME);
		const postsCollection = db.collection("posts");

		await postsCollection.deleteOne({ _id: new ObjectId(poemId) });
	} catch (error) {
		if (env.NODE_ENV === "development") {
			console.error("Error deleting poem:", error);
		}
		return {
			success: false,
			message: "Error deleting poem",
			error: `Error deleting poem: ${error}`,
		};
	}
}
