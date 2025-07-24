"use server";

import { ObjectId } from "mongodb";
import getClientPromise from "@/lib/mongodb";
import { type PoemResponse, type Post, PostSchema } from "@/types/posts";

export async function getPoemById(id: string): Promise<PoemResponse | null> {
	if (!ObjectId.isValid(id)) {
		return null;
	}

	try {
		const client = await getClientPromise();
		const db = client.db(process.env.MONGO_DB_NAME);
		const postsCollection = db.collection<Post>("posts");

		const currentPoem = await postsCollection.findOne({
			_id: new ObjectId(id),
		});

		if (!currentPoem) {
			return null;
		}

		const [previousPoem, nextPoem] = await Promise.all([
			postsCollection
				.find({ created_at: { $lt: currentPoem.created_at } })
				.sort({ created_at: -1 })
				.project<{ _id: ObjectId; title: string; image_url: string }>({
					_id: 1,
					title: 1,
					image_url: 1,
				})
				.limit(1)
				.next(),

			postsCollection
				.find({ created_at: { $gt: currentPoem.created_at } })
				.sort({ created_at: 1 })
				.project<{ _id: ObjectId; title: string; image_url: string }>({
					_id: 1,
					title: 1,
					image_url: 1,
				})
				.limit(1)
				.next(),
		]);

		const formattedPoem = {
			...currentPoem,
			_id: currentPoem._id.toString(),
		};

		return {
			poem: PostSchema.parse(formattedPoem),
			previousPoem: previousPoem
				? { ...previousPoem, _id: previousPoem._id.toString() }
				: null,
			nextPoem: nextPoem ? { ...nextPoem, _id: nextPoem._id.toString() } : null,
		};
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching poem by ID:", error);
		}
		return null;
	}
}
