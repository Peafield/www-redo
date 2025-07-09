"use client";

import useGetLatestPosts from "@/Hooks/useGetLatestPosts";
import { cn } from "@/utils/cn";
import HomeBottomNav from "../navigation/HomeBottomNav";
import HomeLatest from "./HomeLastest";
import { HomeRecentCarousel } from "./HomeRecentCarousel";

type HomeProps = {
	className?: string;
};

export default function Home({ className }: HomeProps) {
	const { postData, loading, error } = useGetLatestPosts();
	if (loading) {
		return <h1>Loading...</h1>;
	}

	if (error) {
		return <h1>Error: {error.message}</h1>;
	}

	if (!postData) {
		return <h1>No posts found.</h1>;
	}
	return (
		postData && (
			<section
				className={cn("flex flex-col gap-4 w-full", {
					[className as string]: !!className,
				})}
			>
				<HomeLatest
					id={postData?.latest?._id as string}
					title={postData?.latest?.title}
					src={postData?.latest?.image_url}
					preview={postData?.latest?.preview_text}
				/>
				<HomeRecentCarousel recentPostsData={postData?.recents} />
				<HomeBottomNav />
			</section>
		)
	);
}
