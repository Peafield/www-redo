import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";

let r2Client: S3Client | null = null;

const getClient = () => {
	if (r2Client) {
		return r2Client;
	}

	if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
		throw new Error(
			'Invalid/Missing environment variable: "R2_ACCESS_KEY_ID" or "R2_SECRET_ACCESS_KEY"',
		);
	}

	r2Client = new S3Client({
		region: process.env.R2_REGION,
		endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
		credentials: {
			accessKeyId: process.env.R2_ACCESS_KEY_ID,
			secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
		},
	});

	return r2Client;
};

export const uploadImageToR2 = async (
	fileBuffer: Buffer,
	fileName: string,
	mimeType: string,
) => {
	const client = getClient();
	try {
		const command = new PutObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: fileName,
			Body: fileBuffer,
			ContentType: mimeType,
		});

		await client.send(command);

		return fileName;
	} catch (error) {
		console.error("Error uploading image to R2:", error);
		throw error;
	}
};

export const getImageFromR2 = async (fileName: string) => {
	const client = getClient();
	try {
		const command = new GetObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: fileName,
		});

		const response = await client.send(command);
		return response;
	} catch (error) {
		console.error("Error retrieving image from R2:", error);
		throw error;
	}
};
