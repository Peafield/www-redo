import clientPromise from "@/lib/mongodb";
import { type Post, PostArraySchema } from "@/types/posts";

export async function fetchPosts(): Promise<Post[] | null> {
	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);
		const posts = await db.collection<Post>("posts").find().toArray();
		const formattedPosts = posts.map((post) => ({
			...post,
			_id: post._id.toString(),
		}));
		const sortedPosts = formattedPosts.sort(
			(a, b) =>
				new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
		);
		const validatedData = PostArraySchema.parse(sortedPosts);
		return validatedData;
	} catch (error) {
		console.error("Error fetching posts:", error);
		return null;
	}
}
