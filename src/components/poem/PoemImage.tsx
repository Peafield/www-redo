import Image from "next/image";

type PoemImageProps = {
	imageUrl: string;
	title: string;
};

export default function PoemImage({ imageUrl, title }: PoemImageProps) {
	const src = `/api/image/${encodeURIComponent(imageUrl)}`;
	return (
		<div className="relative w-full aspect-3/2 drop-shadow-2xl rounded-2xl">
			<Image
				src={src}
				alt={`Image for ${title}`}
				fill
				className="object-cover rounded-2xl"
			/>
			<div
				className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent rounded-2xl z-10"
				aria-hidden="true"
			/>
			<h2 className="absolute bottom-4 left-4 w-2/3 tracking-wider text-5xl font-display font-bold text-pink-lemonade z-20 capitalize">
				{title}
			</h2>
		</div>
	);
}
