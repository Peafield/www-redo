import { ObjectId } from "mongodb";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { fetchLatestPosts } from "@/app/actions/fetchLatestPosts";
import clientPromise from "@/lib/mongodb";
import { type Post, PostInsertSchema, PostSchema } from "@/types/posts";

export async function GET() {
	try {
		const postData = await fetchLatestPosts();
		return NextResponse.json(postData, {
			status: 200,
			headers: {
				"Cache-Control": "no-store, must-revalidate",
				Pragma: "no-cache",
			},
		});
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error fetching posts:", error);
		}
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const json = await req.json();
		const parsedData = PostInsertSchema.parse(json);

		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);

		const result = await db.collection("posts").insertOne(parsedData);

		// Fetch the inserted document to return it
		const insertedPost = await db
			.collection<Post>("posts")
			.findOne({ _id: result.insertedId });

		if (insertedPost) {
			// Convert _id to string
			const formattedPost = {
				...insertedPost,
				_id: insertedPost._id.toString(),
			};
			return NextResponse.json(formattedPost, { status: 201 });
		}
		throw new Error("Failed to retrieve the saved post.");
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error inserting post:", error);
		}
		return NextResponse.json(
			{
				error: error instanceof Error ? error.message : "Internal Server Error",
			},
			{ status: 500 },
		);
	}
}

export async function PATCH(req: NextRequest) {
	try {
		// Parse and validate the request body
		const json = await req.json();
		const parsedData = PostSchema.parse(json);

		const { _id, ...updateData } = parsedData;

		// Connect to the MongoDB client
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);

		// Update the post with the given ID
		const result = await db
			.collection("posts")
			.updateOne({ _id: new ObjectId(_id) }, { $set: updateData });

		// Respond with the number of documents modified
		return NextResponse.json(
			{ modifiedCount: result.modifiedCount },
			{ status: 200 },
		);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return NextResponse.json({ error: error.errors }, { status: 400 });
		}
		if (process.env.NODE_ENV === "development") {
			console.error("Error updating post:", error);
		}
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 },
		);
	}
}
