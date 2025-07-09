import parse from "html-react-parser";
import Image from "next/image";
import type { Post } from "@/types/posts";

type PoemProps = {
	poem: Post;
};

export default function PoemPage({ poem }: PoemProps) {
	const imageUrl = `/api/image/${encodeURIComponent(poem.image_url)}`;
	const title = poem.title;

	return (
		<article className="w-full h-full flex flex-col items-center justify-center gap-8">
			<div className="relative w-full sm:w-2/3 aspect-3/2 drop-shadow-2xl rounded-2xl">
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
			</div>
			<div className="w-full sm:w-2/3 flex items-center justify-end">
				<p className="text-sm font-serif text-shady-character">
					Published {poem.date}
				</p>
			</div>
			<div className="prose prose-p:font-serif lg:prose-lg w-full sm:w-2xl mx-auto mb-4">
				{parse(poem.content)}
			</div>
		</article>
	);
}
