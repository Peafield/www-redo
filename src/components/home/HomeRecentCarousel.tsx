"use client";

import Image from "next/image";
import type { Post } from "@/types/posts";

type HomeRecentCaourselProps = {
	recentPostsData: Post[];
};

export function HomeRecentCarousel({
	recentPostsData,
}: HomeRecentCaourselProps) {
	return (
		<section>
			<h3 className="font-display font-bold text-2xl text-shady-character mb-4">
				Recent Poems
			</h3>
			<div className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
				{recentPostsData?.map((post) => {
					const imageUrl = `/api/image/${encodeURIComponent(post.image_url)}`;
					return (
						<div
							key={post._id as string}
							className="relative flex-shrink-0 w-48 sm:w-1/2 flex-col"
						>
							<div className="relative w-full aspect-3/2">
								<Image
									src={imageUrl}
									alt={`Image for ${post.title}`}
									fill
									className="rounded-2xl object-cover"
								/>
							</div>
							<div>
								<h4 className="font-semibold font-display text-md mt-2 text-shady-character">
									{post.title}
								</h4>
								<p className="text-sm font-serif text-classy-mauve">
									{post.preview_text}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
