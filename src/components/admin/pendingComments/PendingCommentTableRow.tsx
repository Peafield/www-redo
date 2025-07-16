"use client";

import { formatDistanceToNow } from "date-fns";
import {
	approveComment,
	rejectComment,
} from "@/app/actions/commentModerationActions";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import type { Comment } from "@/types/posts";

type PendingCommentTableRowProps = {
	comment: Comment;
};
// TODO: Add confirm action modal for approving and rejecting
export default function PendingCommentTableRow({
	comment,
}: PendingCommentTableRowProps) {
	const timeAgo = formatDistanceToNow(new Date(comment.date), {
		addSuffix: true,
	});

	const handleApproveComment = async () => {
		await approveComment({ commentId: comment._id as string });
	};

	const handleRejectComment = async () => {
		await rejectComment({ commentId: comment._id as string });
	};

	return (
		<tr className="border-t border-t-classy-mauve/50">
			<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
				{comment.content}
			</td>
			<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal ">
				{comment.author}
			</td>
			<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal capitalize">
				{comment.poemTitle}
			</td>
			<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
				{timeAgo}
			</td>
			<td className="py-4 px-3 whitespace-nowrap text-left font-serif text-shady-character text-sm font-medium leading-normal">
				{comment.status}
			</td>
			<td className="py-4 px-3 whitespace-nowrap">
				<div className="flex items-center justify-start gap-4">
					<PrimaryButton
						title={"Approve"}
						type="button"
						className="mb-0"
						onClick={handleApproveComment}
					/>
					<PrimaryButton
						title={"Reject"}
						type="button"
						className="mb-0 bg-red-400 hover:bg-red-500"
						onClick={handleRejectComment}
					/>
				</div>
			</td>
		</tr>
	);
}
