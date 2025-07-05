"use client";

import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import { usePostsStore } from "@/store/postsStore";
import type { ApiResponse } from "@/types/api";
import type { Post } from "@/types/posts";
import Carousel from "./Carousel/Carousel";
import LatestPost from "./LatestSection";
import SectionHeading from "./SectionHeading";

type HomeProps = {
	postsData: Post[] | null;
	error: ApiResponse | null;
};

const Home = ({ postsData, error }: HomeProps) => {
	const { setPosts } = usePostsStore();

	useEffect(() => {
		if (postsData) {
			setPosts(postsData);
		}
	}, [setPosts, postsData]);

	if (error) return <p>Error: {error.message}</p>;
	if (!postsData) return <p>Loading...</p>;
	if (postsData.length === 0) return <p>No posts available</p>;

	const latestPost = postsData[0];
	const remainingPosts = postsData.slice(1, 6); // Show 5 more posts

	return (
		<>
			<SectionHeading text="Latest Poem" />
			<HeroSection post={latestPost} showImage={true}>
				<LatestPost latestPost={latestPost} />
			</HeroSection>
			{remainingPosts.length > 0 && (
				<>
					<SectionHeading text="More Poems" />
					<Carousel posts={remainingPosts} />
				</>
			)}
		</>
	);
};

export default Home;
