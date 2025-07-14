"use client";

import type { fetchLatestPostsReponse } from "@/types/posts";
import { cn } from "@/utils/cn";
import BottomNav from "../navigation/BottomNav";
import ThematicBreak from "../visuals/ThematicBreak";
import HomeLatest from "./HomeLastest";
import { HomeRecentCarousel } from "./HomeRecentCarousel";

type HomeProps = {
	postData: fetchLatestPostsReponse | null;
	className?: string;
};

export default function Home({ postData, className }: HomeProps) {
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
				<ThematicBreak />
				<HomeRecentCarousel recentPostsData={postData?.recents} />
				<BottomNav />
			</section>
		)
	);
}
