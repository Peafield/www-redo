"use server";

import { env } from "@/env";
import clientPromise from "@/lib/mongodb";
import type { PaginatedPostsResponse } from "@/types/api";
import type { Post } from "@/types/posts";

export async function fetchArchivePosts({
	page = 1,
	limit = 8,
}): Promise<PaginatedPostsResponse | null> {
	try {
		const client = await clientPromise;
		const db = client.db(env.MONGO_DB_NAME);
		const postsCollection = db.collection<Post>("posts");

		const skip = (page - 1) * limit;

		const [posts, totalPosts] = await Promise.all([
			postsCollection
				.find()
				.sort({ created_at: -1 })
				.skip(skip)
				.limit(limit)
				.toArray(),
			postsCollection.countDocuments(),
		]);

		const formattedPosts = posts.map((post) => ({
			...post,
			_id: post._id.toString(),
		}));

		return {
			posts: formattedPosts,
			totalPosts: totalPosts,
			hasMoreToLoad: skip + limit < totalPosts,
		};
	} catch (error) {
		console.error("Error fetching archive posts:", error);
		return null;
	}
}
