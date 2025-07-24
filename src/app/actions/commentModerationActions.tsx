"use server";

import { ObjectId } from "mongodb";

import clientPromise from "@/lib/mongodb";

type CommentModerationActionResult = {
	success: boolean;
	message?: string;
	error?: string;
};

type ApproveCommentProps = {
	commentId: string;
};

export async function approveComment({
	commentId,
}: ApproveCommentProps): Promise<CommentModerationActionResult> {
	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);
		const commentCollection = db.collection("comments");

		await commentCollection.updateOne(
			{
				_id: new ObjectId(commentId),
			},
			{
				$set: {
					status: "approved",
				},
			},
		);

		return {
			success: true,
		};
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error approving comment:", error);
		}
		return {
			success: false,
			message: "Error approving comment",
			error: `Error approving comment: ${error}`,
		};
	}
}

type RejectCommentProps = {
	commentId: string;
};

export async function rejectComment({
	commentId,
}: RejectCommentProps): Promise<CommentModerationActionResult> {
	try {
		const client = await clientPromise;
		const db = client.db(process.env.MONGO_DB_NAME);
		const commentCollection = db.collection("comments");

		await commentCollection.updateOne(
			{
				_id: new ObjectId(commentId),
			},
			{
				$set: {
					status: "rejected",
				},
			},
		);

		return {
			success: true,
		};
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error rejecting comment:", error);
		}
		return {
			success: false,
			message: "Error rejecting comment",
			error: `Error rejecting comment: ${error}`,
		};
	}
}
