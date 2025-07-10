import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/posts";

type ArchivePoemCardProps = {
	post: Post;
};

export default function ArchivePoemCard({ post }: ArchivePoemCardProps) {
	const imageUrl = `/api/image/${encodeURIComponent(post.image_url)}`;
	return (
		<Link
			href={`/poem/${post._id as string}`}
			className="group relative flex-shrink-0 w-full flex items-center justify-center gap-4 border-b-1 border-classy-mauve pb-4"
		>
			<div className="relative w-1/2 aspect-3/2 transform transition-all duration-300 ease-in-out group-hover:scale-95">
				<Image
					src={imageUrl}
					alt={`Image for ${post.title}`}
					fill
					className="rounded-2xl object-cover shadow-lg"
				/>
			</div>
			<div className="flex flex-col items-start justify-around w-1/2 h-full">
				<h4 className="font-semibold font-display text-md mt-2 text-shady-character capitalize">
					{post.title}
				</h4>
				<p className="text-sm font-serif text-classy-mauve">
					{post.preview_text}
				</p>
				<button
					type="button"
					className="w-full flex items-center justify-end mt-4"
				>
					<p className="text-sm font-serif text-shady-character italic hover:text-classy-mauve transform transition-all duration-300 ease-in-out cursor-pointer">
						Read More
					</p>
				</button>
			</div>
		</Link>
	);
}
