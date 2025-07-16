"use client";

import { useState, useTransition } from "react";
import { fetchArchivePosts } from "@/app/actions/fetchArchivePosts";
import type { PaginatedPostsResponse } from "@/types/api";
import PrimaryButton from "../buttons/PrimaryButton";
import BottomNav from "../navigation/BottomNav";
import Subheading from "../typography/Subheading";
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
		<section className="h-full flex flex-col gap-6 w-full">
			<Subheading text={"Archive"} />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
				{posts.map((post) => (
					<ArchivePoemCard key={post._id as string} post={post} />
				))}
			</div>
			<div className="flex justify-center mt-12">
				{hasMoreToLoad && (
					<PrimaryButton
						type="button"
						title={isPending ? "Loading..." : "Load More"}
						onClick={handleLoadMore}
						disabled={isPending}
					/>
				)}
			</div>
			<BottomNav />
		</section>
	);
}
