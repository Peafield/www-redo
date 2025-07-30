"use server";

import { ObjectId } from "mongodb";
import getClientPromise from "@/lib/mongodb";

export default async function deletePoem(poemId: string) {
	try {
		const client = await getClientPromise();
		const db = client.db(process.env.MONGO_DB_NAME);
		const postsCollection = db.collection("posts");
		const commentsCollection = db.collection("comments");

		const deleteResult = await postsCollection.deleteOne({
			_id: new ObjectId(poemId),
		});
		if (deleteResult.deletedCount === 0) {
			console.warn(`Poem with ID ${poemId} not found for deletion.`);
		}

		await commentsCollection.updateMany(
			{ poemId: poemId },
			{ $set: { status: "deleted" } },
		);

		return {
			success: true,
			message:
				"Poem and its associated comments have been successfully handled.",
		};
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
