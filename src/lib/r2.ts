import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";
import { env } from "@/env";

if (!env.R2_ACCESS_KEY_ID || !env.R2_SECRET_ACCESS_KEY) {
	throw new Error(
		'Invalid/Missing environment variable: "R2_ACCESS_KEY_ID" or "R2_SECRET_ACCESS_KEY"',
	);
}

const r2Client = new S3Client({
	region: env.R2_REGION,
	endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: env.R2_ACCESS_KEY_ID,
		secretAccessKey: env.R2_SECRET_ACCESS_KEY,
	},
});

export const uploadImageToR2 = async (
	fileBuffer: Buffer,
	fileName: string,
	mimeType: string,
) => {
	try {
		const command = new PutObjectCommand({
			Bucket: env.R2_BUCKET_NAME,
			Key: fileName,
			Body: fileBuffer,
			ContentType: mimeType,
		});

		await r2Client.send(command);

		return fileName;
	} catch (error) {
		console.error("Error uploading image to R2:", error);
		throw error;
	}
};

export const getImageFromR2 = async (fileName: string) => {
	try {
		const command = new GetObjectCommand({
			Bucket: env.R2_BUCKET_NAME,
			Key: fileName,
		});

		const response = await r2Client.send(command);
		return response;
	} catch (error) {
		console.error("Error retrieving image from R2:", error);
		throw error;
	}
};
