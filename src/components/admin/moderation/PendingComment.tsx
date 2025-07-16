import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
	approveComment,
	rejectComment,
} from "@/app/actions/commentModerationActions";
import Modal from "@/components/modal/Modal";
import DeleteIcon from "@/components/svgs/DeleteIcon";
import TickIcon from "@/components/svgs/TickIcon";
import ThematicBreak from "@/components/visuals/ThematicBreak";
import type { CommentModerationModal } from "@/types/components";
import type { Comment } from "@/types/posts";

type PendingCommentProps = {
	comment: Comment;
	updatePendingComments: () => void;
};

export default function PendingComment({
	comment,
	updatePendingComments,
}: PendingCommentProps) {
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
			<div className="flex items-start space-x-4">
				<div className="flex-grow">
					<p className="font-serif italic text-shady-character">{`On "${comment.poemTitle}"`}</p>
					<p className="mt-2 font-serif text-shady-character">
						{comment.content}
					</p>
					<div className="text-sm font-serif text-shady-character/50 mt-1">{`- ${comment.author}, ${timeAgo}`}</div>
				</div>
				<div className="flex space-x-2 flex-shrink-0">
					<button
						type="button"
						className="p-2 rounded-full hover:bg-green-100 cursor-pointer"
						onClick={() => toggleModal("approve")}
					>
						<TickIcon className="size-4 text-green-600" />
					</button>
					<button
						type="button"
						className="p-2 rounded-full hover:bg-red-100 cursor-pointer"
						onClick={() => toggleModal("reject")}
					>
						<DeleteIcon className="size-4 text-red-600" />
					</button>
				</div>
			</div>
		</>
	);
}
