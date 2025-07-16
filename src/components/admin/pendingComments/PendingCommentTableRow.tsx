"use client";

import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
	approveComment,
	rejectComment,
} from "@/app/actions/commentModerationActions";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import Modal from "@/components/modal/Modal";
import type { CommentModerationModal } from "@/types/components";
import type { Comment } from "@/types/posts";

type PendingCommentTableRowProps = {
	comment: Comment;
	updatePendingComments: () => void;
};

export default function PendingCommentTableRow({
	comment,
	updatePendingComments,
}: PendingCommentTableRowProps) {
	const [showModal, setShowModal] = useState(false);
	const [modalType, setModalType] = useState<CommentModerationModal | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState(false);

	const timeAgo = formatDistanceToNow(new Date(comment.date), {
		addSuffix: true,
	});

	const toggleModal = (modalType: string) => {
		if (modalType === "approve") {
			setModalType({
				type: "approve",
				title: "Approve comment?",
				buttonTitle: "Approve",
				children: "Are you sure you want to approve this comment?",
				buttonClick: handleApproveComment,
			});
		} else {
			setModalType({
				type: "reject",
				title: "Reject comment?",
				buttonTitle: "Reject",
				children: "Are you sure you want to reject this comment?",
				buttonClick: handleRejectComment,
			});
		}
		setShowModal((prev) => !prev);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const handleApproveComment = async () => {
		setIsLoading(true);
		await approveComment({ commentId: comment._id as string });
		updatePendingComments();
		closeModal();
		setIsLoading(false);
	};

	const handleRejectComment = async () => {
		setIsLoading(true);
		await rejectComment({ commentId: comment._id as string });
		updatePendingComments();
		closeModal();
		setIsLoading(false);
	};

	return (
		<>
			{showModal && modalType && (
				<Modal
					isOpen={showModal}
					title={modalType.title}
					onClose={closeModal}
					buttonTitle={
						isLoading
							? modalType.buttonTitle === "Approve"
								? "Approving..."
								: "Rejecting..."
							: modalType.buttonTitle
					}
					primaryButtonClick={modalType.buttonClick}
				>
					{modalType.children}
				</Modal>
			)}
			<tr className="border-t border-t-classy-mauve/50">
				<td className="py-4 px-3 whitespace-nowrap sm:whitespace-normal text-left font-serif text-shady-character text-sm font-medium leading-normal">
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
							onClick={() => toggleModal("approve")}
						/>
						<PrimaryButton
							title={"Reject"}
							type="button"
							className="mb-0 bg-red-400 hover:bg-red-500"
							onClick={() => toggleModal("reject")}
						/>
					</div>
				</td>
			</tr>
		</>
	);
}
