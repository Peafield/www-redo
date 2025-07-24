"use client";

import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/posts";
import Subheading from "../typography/Subheading";

type HomeRecentCaourselProps = {
	recentPostsData: Post[];
};

export function HomeRecentCarousel({
	recentPostsData,
}: HomeRecentCaourselProps) {
	return (
		<section className="sm:mt-8">
			<Subheading text={"Recent Poems"} />
			<div
				className="flex overflow-x-auto gap-4 pb-4 -mx-4 px-4 [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden
	sm:[scrollbar-width:auto]
    sm:[scrollbar-color:#fecdd3_#fff1f2]
    sm:[&::-webkit-scrollbar]:h-2
    sm:[&::-webkit-scrollbar-track]:bg-classy-mauve
    sm:[&::-webkit-scrollbar-thumb]:bg-shady-character
    sm:[&::-webkit-scrollbar-thumb]:rounded-full"
			>
				{recentPostsData?.map((post) => {
					const imageUrl = `/api/image/${encodeURIComponent(post.image_url)}`;
					return (
						<Link
							href={`/poem/${post._id as string}`}
							key={post._id as string}
							className="group relative flex-shrink-0 w-56 sm:w-1/2 flex-col"
						>
							<div className="relative w-full aspect-3/2 transform transition-all duration-300 ease-in-out group-hover:scale-95">
								<Image
									src={imageUrl}
									alt={`Image for ${post.title}`}
									fill
									sizes="(max-width: 640px) 100vw, 50vw"
									className="rounded-2xl object-cover shadow-lg"
								/>
							</div>
							<div>
								<h4 className="font-semibold font-display text-md mt-2 text-shady-character capitalize">
									{post.title}
								</h4>
								<p className="text-sm font-serif text-classy-mauve">
									{post.preview_text}
								</p>
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
}
