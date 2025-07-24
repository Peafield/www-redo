"use server";

import { ObjectId } from "mongodb";
import sharp from "sharp";
import { env } from "@/env";
import clientPromise from "@/lib/mongodb";
import { uploadImageToR2 } from "@/lib/r2";
import {
	PostCreationSchema,
	type PostInsert,
	PostUpdateValidationSchema,
} from "@/types/posts";
import { getPreviewText } from "@/utils/getPreviewText";

export type AdminSavePoemActionResult = {
	success: boolean;
	message?: string;
	errors?: {
		title?: string[];
		content?: string[];
		images?: string[];
	};
	error?: string;
} | null;

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
		const db = client.db(env.MONGO_DB_NAME);
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
		if (env.NODE_ENV === "development") {
			console.error("Error submitting comment:", error);
		}
		return {
			success: false,
			message: "Error submitting comment",
			error: "Error submitting comment",
		};
	}
}

export async function adminPatchPoemAction(
	_prevState: AdminSavePoemActionResult | null,
	formData: FormData,
) {
	try {
		const imageBlob = formData.get("image") as Blob | null;

		const validatedFields = PostUpdateValidationSchema.safeParse({
			_id: formData.get("_id") as string,
			title: formData.get("title") as string,
			content: formData.get("content") as string,
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

		const { _id, title, content } = validatedFields.data;
		const updatePayload: Partial<PostInsert> & { updated_at?: string } = {
			title,
			content,
			preview_text: getPreviewText(content),
			updated_at: new Date().toISOString(),
		};

		if (imageBlob && imageBlob.size > 0) {
			const fileNameAfterUpload = await processAndSaveImage(imageBlob, title);
			if (typeof fileNameAfterUpload !== "string") {
				return { success: false, message: "Failed to upload image" };
			}
			updatePayload.image_url = fileNameAfterUpload;
		}

		const client = await clientPromise;
		const db = client.db(env.MONGO_DB_NAME);
		const postCollection = db.collection<PostInsert>("posts");

		const result = await postCollection.updateOne(
			{ _id: new ObjectId(_id) },
			{ $set: updatePayload },
		);

		if (result.modifiedCount === 0) {
			return {
				success: false,
				message:
					"Failed to update poem. Document not found or no changes made.",
			};
		}

		return {
			success: true,
			message: "Poem updated successfully!",
		};
	} catch (error) {
		if (env.NODE_ENV === "development") {
			console.error("Error updating poem:", error);
		}
		return {
			success: false,
			message: "Error updating poem",
			error:
				error instanceof Error ? error.message : "An unknown error occurred",
		};
	}
}
