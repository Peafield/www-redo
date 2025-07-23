"use client";

import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { useState } from "react";
import adminDeletePoem from "@/app/actions/adminDeletePoem";
import Modal from "@/components/modal/Modal";
import DeleteIcon from "@/components/svgs/DeleteIcon";
import EditIcon from "@/components/svgs/EditIcon";
import type { Post } from "@/types/posts";

type PoemDetailsProps = {
	poem: Post;
	updatePosts: () => Promise<void>;
};

export default function PoemDetails({ poem, updatePosts }: PoemDetailsProps) {
	const [showModal, setShowModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const timeAgo = formatDistanceToNow(new Date(poem.date), {
		addSuffix: true,
	});

	const closeModal = () => {
		setShowModal(false);
	};

	const handleDeletePoem = async () => {
		setIsLoading(true);
		await adminDeletePoem(poem._id as string);
		updatePosts();
		closeModal();
		setIsLoading(false);
	};

	return (
		<>
			{showModal && (
				<Modal
					isOpen={showModal}
					title={"Delete poem?"}
					onClose={closeModal}
					buttonTitle={isLoading ? "Deleting..." : "Delete"}
					primaryButtonClick={handleDeletePoem}
				>
					Are you sure you want to delete this poem?
				</Modal>
			)}
			<div className="flex items-start space-x-4">
				<div className="flex-grow">
					<p className="font-serif italic text-shady-character">{poem.title}</p>
					<p className="mt-2 font-serif text-shady-character">
						{poem.preview_text}
					</p>
					<div className="text-sm font-serif text-shady-character/50 mt-1">{`- published ${timeAgo}`}</div>
				</div>
				<div className="flex space-x-2 flex-shrink-0">
					<button
						type="button"
						className="p-2 rounded-full hover:bg-green-100 cursor-pointer"
						onClick={() => setShowModal(true)}
					>
						<EditIcon className="size-4 text-green-600" />
					</button>
					<button
						type="button"
						className="p-2 rounded-full hover:bg-red-100 cursor-pointer"
						onClick={() => setShowModal(true)}
					>
						<DeleteIcon className="size-4 text-red-600" />
					</button>
				</div>
			</div>
		</>
	);
}
