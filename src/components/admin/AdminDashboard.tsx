"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPendingComments } from "@/app/actions/getPendingComments";
import type { Comment } from "@/types/posts";
import ArrowIcon from "../svgs/ArrowIcon";
import TeaIcon from "../svgs/TeaIcon";
import Subheading from "../typography/Subheading";
import PendingCommentTableRow from "./pendingComments/PendingCommentTableRow";

type AdminDashboardProps = {
	pendingComments: Comment[] | null;
};

export default function AdminDashboard({
	pendingComments,
}: AdminDashboardProps) {
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
		<section>
			<Subheading text={"Comment moderation"} />
			<div className="overflow-x-auto rounded-xl border-2 border-classy-mauve/50">
				<table className="min-w-full divide-y divide-classy-mauve/50">
					<thead>
						<tr>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Comment
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Author
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Poem
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Date
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Status
							</th>
							<th className="py-4 px-3 whitespace-nowrap text-left text-pink-lemonade bg-shady-character/80 font-display text-sm font-medium leading-normal">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{pendingCommentsState?.map((comment) => (
							<PendingCommentTableRow
								key={comment._id as string}
								comment={comment}
								updatePendingComments={updateComments}
							/>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
