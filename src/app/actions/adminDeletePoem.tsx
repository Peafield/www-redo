"use server";

import { ObjectId } from "mongodb";
import getClientPromise from "@/lib/mongodb";

export default async function deletePoem(poemId: string) {
	try {
		const client = await getClientPromise();
		const db = client.db(process.env.MONGO_DB_NAME);
		const postsCollection = db.collection("posts");

		await postsCollection.deleteOne({ _id: new ObjectId(poemId) });
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error deleting poem:", error);
		}
		return {
			success: false,
			message: "Error deleting poem",
			error: `Error deleting poem: ${error}`,
		};
	}
}
