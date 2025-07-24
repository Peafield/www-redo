import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/posts";
import PrimaryButton from "../buttons/PrimaryButton";

type ArchivePoemCardProps = {
	post: Post;
};

export default function ArchivePoemCard({ post }: ArchivePoemCardProps) {
	const imageUrl = `/api/image/${encodeURIComponent(post.image_url)}`;
	return (
		<Link
			href={`/poem/${post._id as string}`}
			className="group relative flex-shrink-0 w-full flex flex-col gap-4 pb-4 bg-classy-mauve/50 rounded-2xl"
		>
			<div className="relative w-full aspect-3/2 transform transition-all duration-300 ease-in-out group-hover:scale-105">
				<Image
					src={imageUrl}
					alt={`Image for ${post.title}`}
					sizes="(max-width: 640px) 100vw, 50vw"
					fill
					className="rounded-2xl object-cover shadow-lg"
				/>
			</div>
			<div className="flex flex-col gap-4 px-4">
				<div>
					<h4 className="font-semibold font-display text-md mt-2 text-shady-character capitalize">
						{post.title}
					</h4>
					<p className="text-sm font-serif text-shady-character truncate">
						{post.preview_text}
					</p>
				</div>
				<div className="flex items-center w-full">
					<PrimaryButton type="button" title="Read more" />
				</div>
			</div>
		</Link>
	);
}
