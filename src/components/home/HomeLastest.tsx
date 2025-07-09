import Image from "next/image";
import Link from "next/link";

type HomeLatestProps = {
	id: string;
	title: string;
	src: string;
	preview: string;
};

export default function HomeLatest({
	id,
	title,
	src,
	preview,
}: HomeLatestProps) {
	const imageUrl = `/api/image/${encodeURIComponent(src)}`;
	return (
		<section className="group w-full h-full mb-4 flex flex-col items-center justify-center">
			<Link
				href={`/poem/${id}`}
				className="relative w-full sm:w-2/3 aspect-3/2 drop-shadow-2xl rounded-2xl transform transition-all duration-300 ease-in-out group-hover:scale-105"
			>
				<Image
					src={imageUrl}
					alt={`Image for ${title}`}
					fill
					className="object-cover rounded-2xl"
				/>
				<div
					className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent rounded-2xl z-10"
					aria-hidden="true"
				/>
				<h2 className="absolute bottom-4 left-4 w-2/3 tracking-wider text-5xl font-display font-bold text-pink-lemonade z-20">
					{title}
				</h2>
			</Link>
			<article className="w-full sm:w-2/3 p-4 transform">
				<p className="text-lg italic leading-relaxed tracking-wide text-wrap text-shady-character mt-4 font-serif">
					{preview}
				</p>
			</article>
		</section>
	);
}
