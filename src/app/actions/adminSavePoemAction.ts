"use server";

import sharp from "sharp";
import clientPromise from "@/lib/mongodb";
import { uploadImageToR2 } from "@/lib/r2";
import { PostCreationSchema, type PostInsert } from "@/types/posts";
import { getPreviewText } from "@/utils/getPreviewText";

type AdminSavePoemActionResult = {
	success: boolean;
	message?: string;
	errors?: {
		title?: string[];
		content?: string[];
		images?: string[];
	};
	error?: string;
};

export async function processAndSaveImage(imageBlob: Blob, title: string) {
	try {
		const buffer = Buffer.from(await imageBlob.arrayBuffer());
		const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
		const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
		const filename = `${sanitizedTitle}.webp`;
		const fileNameAfterUpload = await uploadImageToR2(
			webpBuffer,
			filename,
			"image/webp",
		);
		return fileNameAfterUpload;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return {
			success: false,
			message: "Failed to connect to MongoDB",
			error: errorMessage,
		};
	}
}

export async function adminSavePoemAction(
	_prevState: AdminSavePoemActionResult | null,
	formData: FormData,
) {
	try {
		const validatedFields = PostCreationSchema.safeParse({
			title: formData.get("title") as string,
			content: formData.get("content") as string,
			image: formData.get("image") as Blob,
		});

		if (!validatedFields.success) {
			console.error(
				"Form validation failed:",
				validatedFields.error.flatten().fieldErrors,
			);
			return {
				success: false,
				errors: validatedFields.error.flatten().fieldErrors,
			};
		}

		const { title, content, image } = validatedFields.data;
		if (!image || !title || !content) {
			return { success: false, message: "Missing required fields" };
		}

		const fileNameAfterUpload = await processAndSaveImage(image, title);
		if (!fileNameAfterUpload) {
			return { success: false, message: "Failed to upload image" };
		}

		const previewText = getPreviewText(content);

		const finalFormattedPost: PostInsert = {
			title,
			content,
			image_url: fileNameAfterUpload as string,
			date: new Date().toLocaleDateString("en-GB", {
				day: "numeric",
				month: "short",
				year: "numeric",
			}),
			created_at: new Date().toISOString(),
			preview_text: previewText,
		};

		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);
		const postCollection = db.collection<PostInsert>("posts");

		const result = await postCollection.insertOne(finalFormattedPost);

		const insertedComment = await postCollection.findOne({
			_id: result.insertedId,
		});

		if (!insertedComment) {
			return {
				success: false,
				message: "Failed to insert poem into database",
				error: "Failed to insert poem into database",
			};
		}
		return {
			success: true,
		};
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error submitting comment:", error);
		}
		return {
			success: false,
			message: "Error submitting comment",
			error: "Error submitting comment",
		};
	}
}
