"use client";

import { useEffect, useState } from "react";
import { usePostsStore } from "../../store/postsStore";
import ContentCard from "./ContentCard";
import HeroSection from "./HeroSection";

type PoemProps = {
	id: string;
};

const Poem = ({ id }: PoemProps) => {
	const { posts } = usePostsStore();
	const post = posts?.find((post) => post._id === id);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	return (
		post && (
			<>
				<HeroSection post={post} showImage={true}>
					<div
						className={`absolute inset-0 flex items-center justify-center bg-gray-900/35 pb-20 transition-opacity duration-700 ease-in-out ${
							isVisible ? "opacity-100" : "opacity-0"
						}`}
					>
						<h1 className="text-center font-lato font-black text-white mobile:text-3xl md:text-7xl">
							{post.title}
						</h1>
					</div>
				</HeroSection>
				<ContentCard
					content={post.content}
					date={post.date}
					showShareButton={true}
				/>
			</>
		)
	);
};

export default Poem;
