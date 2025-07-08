"use client";

import Image from "next/image";
import useGetPosts from "@/Hooks/useGetPosts";

export function HomeRecentCarousel() {
	const { postData, loading, error } = useGetPosts();
	if (!loading) {
		<h1>Loading...</h1>;
	}
	if (error) {
		<h1>Error: {error.message}</h1>;
	}
	return (
		<section>
			<h3 className="font-display font-bold text-2xl text-shady-character mb-4">
				Recent Poems
			</h3>
			<div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
				{postData?.map((post) => (
					<div key={post.title} className="flex-shrink-0 w-48">
						<Image
							src={post.image_url}
							alt={`Image for ${post.title}`}
							fill
							className="object-cover rounded-2xl"
						/>
						<h4 className="font-semibold font-display text-md mt-2 text-shady-character">
							{post.title}
						</h4>
						<p className="text-sm text-classy-mauve">{post.preview_text}</p>
					</div>
				))}
			</div>
		</section>
	);
}
