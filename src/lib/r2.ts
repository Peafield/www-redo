import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";

const r2Client = new S3Client({
	region: process.env.R2_REGION,
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
});

export const uploadImageToR2 = async (
	fileBuffer: Buffer,
	fileName: string,
	mimeType: string,
) => {
	try {
		const command = new PutObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
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
			Bucket: process.env.R2_BUCKET_NAME,
			Key: fileName,
		});

		const response = await r2Client.send(command);
		return response.Body; // This returns a stream you can use to serve the file
	} catch (error) {
		console.error("Error retrieving image from R2:", error);
		throw error;
	}
};
