"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPendingComments } from "@/app/actions/getPendingComments";
import ArrowIcon from "@/components/svgs/ArrowIcon";
import TeaIcon from "@/components/svgs/TeaIcon";
import Subheading from "@/components/typography/Subheading";
import ThematicBreak from "@/components/visuals/ThematicBreak";
import type { Comment } from "@/types/posts";
import PendingComment from "./PendingComment";

type CommentModerationProps = {
	pendingComments: Comment[] | null;
};

export default function CommentModeration({
	pendingComments,
}: CommentModerationProps) {
	const [pendingCommentsState, setPendingCommentsState] = useState<
		Comment[] | null
	>(null);

	useEffect(() => {
		setPendingCommentsState(pendingComments);
	}, [pendingComments]);

	const updateComments = async () => {
		const updatedComments = await getPendingComments();
		setPendingCommentsState(updatedComments);
	};

	if (pendingCommentsState === null || pendingCommentsState.length === 0) {
		return (
			<section className="w-full h-full flex-1 flex flex-col items-center justify-center gap-6 text-center">
				<TeaIcon className="size-16 text-shady-character" />
				<h2 className="text-2xl text-shady-character font-display">
					You're all caught up and there are no more comments to moderate. Time
					for a cuppa!
				</h2>
				<Link
					href={"/"}
					className="group flex items-center justify-center"
					replace
				>
					<p className="text-shady-character font-serif mr-2 group-hover:text-classy-mauve transition-colors duration-300 ease-in-out">
						Go back home
					</p>
					<ArrowIcon className="text-shady-character size-3.5 group-hover:text-classy-mauve transition-colors duration-300 ease-in-out" />
				</Link>
			</section>
		);
	}

	return (
		<section className="w-full h-full flex-1 flex flex-col items-center justify-start">
			<div className="bg-white/50 p-8 rounded-lg shadow-sm border border-gray-200 w-full sm:w-2xl">
				<Subheading text="Moderate Comments" className="mb-8" />
				<div className="space-y-8">
					{pendingCommentsState?.map((comment, index) => (
						<>
							<PendingComment
								key={comment._id as string}
								comment={comment}
								updatePendingComments={updateComments}
							/>
							{index !== pendingCommentsState.length - 1 && (
								<ThematicBreak className="border-gray-200" />
							)}
						</>
					))}
				</div>
			</div>
		</section>
	);
}
