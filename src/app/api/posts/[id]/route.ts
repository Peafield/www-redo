import { ObjectId } from "mongodb";
import { type NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

type Context = {
	params: Promise<{
		id: string;
	}>;
};

export async function DELETE(_request: NextRequest, { params }: Context) {
	const { id } = await params;

	if (!id || !ObjectId.isValid(id)) {
		return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
	}

	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);

		const result = await db
			.collection("posts")
			.deleteOne({ _id: new ObjectId(id) });

		if (result.deletedCount === 0) {
			return NextResponse.json({ error: "Post not found" }, { status: 404 });
		}

		return NextResponse.json({ success: true }, { status: 200 });
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error deleting post:", error);
		}
		return NextResponse.json(
			{ error: "Failed to delete post" },
			{ status: 500 },
		);
	}
}
