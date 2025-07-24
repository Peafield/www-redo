import { type NextRequest, NextResponse } from "next/server";
import { getImageFromR2 } from "@/lib/r2";

export const dynamic = "force-dynamic";

type Context = {
	params: Promise<{
		imageName: string;
	}>;
};

export async function GET(_request: NextRequest, { params }: Context) {
	const { imageName } = await params;

	try {
		const r2Response = await getImageFromR2(imageName);

		if (!r2Response?.Body) {
			return new NextResponse("Image not found", { status: 404 });
		}

		const stream = r2Response.Body as ReadableStream;

		return new NextResponse(stream, {
			headers: {
				"Content-Type": r2Response.ContentType || "application/octet-stream",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (error) {
		console.error("Error retrieving image from R2:", error);
		return new NextResponse("Image not found", { status: 404 });
	}
}
