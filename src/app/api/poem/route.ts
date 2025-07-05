import { ObjectId } from "mongodb";
import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { type Post, PostSchema } from "@/types/posts";

type Context = {
	params: Promise<{
		id: string;
	}>;
};

export async function GET(_request: NextRequest, { params }: Context) {
	try {
		const { id } = await params;
		// Connect to the MongoDB client
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);

		// Fetch all posts
		const poem = await db
			.collection<Post>("posts")
			.findOne({ _id: new ObjectId(id) });

		if (!poem) {
			return NextResponse.json({ error: "Poem not found" }, { status: 404 });
		}

		// Convert ObjectId to string
		const formattedPoem = {
			...poem,
			_id: poem._id.toString(),
		};

		// Validate data using Zod schema
		const validatedData = PostSchema.parse(formattedPoem);

		// Return the validated data
		return NextResponse.json(validatedData, {
			status: 200,
			headers: {
				"Cache-Control": "no-store, must-revalidate",
				Pragma: "no-cache",
			},
		});
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching a poem:", error);
		}
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
