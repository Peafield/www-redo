import Image from "next/image";

type HomeLatestProps = {
	title: string;
	src: string;
	preview: string;
};

export default function HomeLatest({ title, src, preview }: HomeLatestProps) {
	const imageUrl = `/api/image/${encodeURIComponent(src)}`;
	return (
		<section className="w-full h-full mb-4 flex flex-col items-center justify-center">
			<div className="relative w-full sm:w-2/3 aspect-3/2 drop-shadow-2xl rounded-2xl ">
				<Image
					src={imageUrl}
					alt={`Image for ${title}`}
					fill
					className="object-cover rounded-2xl"
				/>
				<h2 className="absolute bottom-4 left-4 w-2/3 tracking-wider text-5xl font-display font-bold text-pink-lemonade">
					{title}
				</h2>
			</div>
			<article className="w-full sm:w-2/3 p-4">
				<p className="text-lg italic leading-relaxed tracking-wide text-wrap text-shady-character mt-4 font-serif">
					{preview}
				</p>
			</article>
		</section>
	);
}
