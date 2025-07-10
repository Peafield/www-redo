"use client";

import { useState, useTransition } from "react";
import { fetchArchivePosts } from "@/app/actions/fetchArchivePosts";
import type { PaginatedPostsResponse } from "@/types/api";
import BottomNav from "../navigation/BottomNav";
import ChevronDownIcon from "../svgs/ChevronDownIcon";
import ArchivePoemCard from "./ArchivePoemCard";

type ArchiveProps = {
	postData: PaginatedPostsResponse | null;
};

export default function ArchivePage({ postData }: ArchiveProps) {
	const [posts, setPosts] = useState(postData?.posts || []);
	const [hasMoreToLoad, setHasMoreToLoad] = useState(
		postData?.hasMoreToLoad || false,
	);
	const [page, setPage] = useState(2);
	const [isPending, startTransition] = useTransition();

	const handleLoadMore = () => {
		startTransition(async () => {
			const newPostData = await fetchArchivePosts({ page });

			if (newPostData) {
				setPosts((prevPosts) => [...prevPosts, ...newPostData.posts]);
				setHasMoreToLoad(newPostData.hasMoreToLoad);
				setPage((prevPage) => prevPage + 1);
			}
		});
	};

	return (
		<section className="h-full flex-1 flex flex-col gap-6 w-full">
			<h3 className="font-display font-bold text-2xl text-shady-character mb-4">
				Archive
			</h3>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				{posts.map((post) => (
					<ArchivePoemCard key={post._id as string} post={post} />
				))}
			</div>
			<div className="flex justify-center mt-12">
				{hasMoreToLoad && (
					<button
						type="button"
						onClick={handleLoadMore}
						disabled={isPending}
						className="px-6 py-3 text-shady-character text-xl font-display font-bold disabled:text-classy-mauve cursor-pointer hover:text-classy-mauve flex flex-col items-center justify-center"
					>
						<h4 className="tracking-wide">
							{isPending ? "Loading..." : "Load More"}
						</h4>
						<ChevronDownIcon className="size-6" />
					</button>
				)}
			</div>
			<BottomNav />
		</section>
	);
}
