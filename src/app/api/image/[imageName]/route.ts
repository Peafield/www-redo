import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";

const r2Client = new S3Client({
	region: process.env.R2_REGION,
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
});

type Context = {
	params: Promise<{
		imageName: string;
	}>;
};

export async function GET(_request: NextRequest, { params }: Context) {
	const { imageName } = await params;

	try {
		const command = new GetObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: imageName,
		});

		const response = await r2Client.send(command);
		const stream = response.Body as ReadableStream;

		return new NextResponse(stream, {
			headers: {
				"Content-Type": response.ContentType || "application/octet-stream",
				"Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (error) {
		console.error("Error retrieving image from R2:", error);
		return new NextResponse("Image not found", { status: 404 });
	}
}
