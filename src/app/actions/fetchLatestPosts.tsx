import { env } from "@/env";
import clientPromise from "@/lib/mongodb";
import {
	type fetchLatestPostsReponse,
	type Post,
	PostArraySchema,
} from "@/types/posts";

export async function fetchLatestPosts(): Promise<fetchLatestPostsReponse | null> {
	try {
		const client = await clientPromise;
		const db = client.db(env.MONGO_DB_NAME);
		const posts = await db
			.collection<Post>("posts")
			.find()
			.sort({ created_at: -1 })
			.limit(6)
			.toArray();
		const formattedPosts = posts.map((post) => ({
			...post,
			_id: post._id.toString(),
		}));
		const validatedData = PostArraySchema.parse(formattedPosts);
		return {
			latest: validatedData[0],
			recents: validatedData.slice(1),
		};
	} catch (error) {
		console.error("Error fetching posts:", error);
		return null;
	}
}
