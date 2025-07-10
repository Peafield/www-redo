import type { Post } from "@/types/posts";
import PoemContent from "./PoemContent";
import PoemDate from "./PoemDate";
import PoemImage from "./PoemImage";
import PoemShareButton from "./PoemShareButton";

type PoemProps = {
	poem: Post;
};

export default function PoemPage({ poem }: PoemProps) {
	return (
		<article className="w-full h-full flex flex-col items-center justify-center gap-8">
			<PoemImage imageUrl={poem.image_url} title={poem.title} />
			<PoemDate date={poem.date} />
			<PoemContent content={poem.content} />
			<PoemShareButton />
		</article>
	);
}
