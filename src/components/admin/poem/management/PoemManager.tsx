"use client";

import { useEffect, useState } from "react";
import { fetchArchivePosts } from "@/app/actions/fetchArchivePosts";
import Subheading from "@/components/typography/Subheading";
import ThematicBreak from "@/components/visuals/ThematicBreak";
import type { PaginatedPostsResponse } from "@/types/api";
import PoemDetails from "./PoemDetails";

type PoemManagementProps = {
	posts: PaginatedPostsResponse | null;
};

export default function PoemManagement({ posts }: PoemManagementProps) {
	const [currentPoems, setCurrentPoems] =
		useState<PaginatedPostsResponse | null>(null);

	useEffect(() => {
		setCurrentPoems(posts);
	}, [posts]);

	const updatePosts = async () => {
		const updatedPoems = await fetchArchivePosts({});
		setCurrentPoems(updatedPoems);
	};

	return (
		<section className="w-full h-full flex-1 flex flex-col items-center justify-start">
			<div className="bg-white/50 p-8 rounded-lg shadow-sm border border-gray-200 w-full sm:w-2xl">
				<Subheading text="Manage Poems" className="mb-8" />
				<div className="space-y-8">
					{currentPoems?.posts.map((poem, index) => (
						<div key={poem._id as string}>
							<PoemDetails poem={poem} updatePosts={updatePosts} />
							{index !== currentPoems.posts.length - 1 && (
								<ThematicBreak className="border-gray-200" />
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
