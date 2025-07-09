import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { type Post, PostSchema } from "@/types/posts";

export async function getPoemById(id: string): Promise<Post | null> {
	if (!ObjectId.isValid(id)) {
		return null;
	}

	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);

		const poem = await db
			.collection<Post>("posts")
			.findOne({ _id: new ObjectId(id) });

		if (!poem) {
			return null;
		}

		const formattedPoem = {
			...poem,
			_id: poem._id.toString(),
		};

		const validatedData = PostSchema.parse(formattedPoem);
		return validatedData;
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching poem by ID:", error);
		}
		return null;
	}
}
