import type { Post } from "@/types/posts";
import BottomNav from "../navigation/BottomNav";
import PoemContent from "./PoemContent";
import PoemFurtherReading from "./PoemFurtherReading";
import PoemImage from "./PoemImage";
import PoemActions from "./poemActions/PoemActions";

type PoemProps = {
	poem: Post;
	previousPoem: { _id: string; title: string; image_url: string } | null;
	nextPoem: { _id: string; title: string; image_url: string } | null;
};

export default function PoemPage({ poem, previousPoem, nextPoem }: PoemProps) {
	return (
		<article className="w-full sm:w-2/3 mx-auto h-full flex flex-col items-center justify-center gap-8">
			<PoemImage imageUrl={poem.image_url} title={poem.title} />
			<PoemActions date={poem.date} />
			<PoemContent content={poem.content} />
			<PoemFurtherReading previousPoem={previousPoem} nextPoem={nextPoem} />
			<BottomNav />
		</article>
	);
}
