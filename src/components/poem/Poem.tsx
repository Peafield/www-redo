import type { Post } from "@/types/posts";
import BottomNav from "../navigation/BottomNav";
import PoemContent from "./PoemContent";
import PoemImage from "./PoemImage";
import PoemActions from "./poemActions/PoemActions";

type PoemProps = {
	poem: Post;
};

export default function PoemPage({ poem }: PoemProps) {
	return (
		<article className="w-full sm:w-2/3 mx-auto h-full flex flex-col items-center justify-center gap-8">
			<PoemImage imageUrl={poem.image_url} title={poem.title} />
			<PoemActions date={poem.date} />
			<PoemContent content={poem.content} />
			<BottomNav />
		</article>
	);
}
