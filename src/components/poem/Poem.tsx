import type { Comment, Post } from "@/types/posts";
import BottomNav from "../navigation/BottomNav";
import PoemContent from "./PoemContent";
import PoemFurtherReading from "./PoemFurtherReading";
import PoemImage from "./PoemImage";
import PoemActions from "./poemActions/PoemActions";
import PoemCommentForm from "./poemComments/PoemCommentForm";
import PoemComments from "./poemComments/PoemComments";

type PoemProps = {
	poem: Post;
	poemComments: Comment[] | null;
	previousPoem: { _id: string; title: string; image_url: string } | null;
	nextPoem: { _id: string; title: string; image_url: string } | null;
};

// TODO: Add optimistic comment update here to pass to poemComents from poemCommentForm
export default function PoemPage({
	poem,
	poemComments,
	previousPoem,
	nextPoem,
}: PoemProps) {
	return (
		<article className="w-full sm:w-2/3 mx-auto h-full flex flex-col items-center justify-center gap-8">
			<PoemImage imageUrl={poem.image_url} title={poem.title} />
			<PoemActions date={poem.date} />
			<PoemContent content={poem.content} />
			{poemComments && poemComments.length > 0 && (
				<PoemComments comments={poemComments} />
			)}
			<PoemCommentForm poemId={poem._id as string} />
			<PoemFurtherReading previousPoem={previousPoem} nextPoem={nextPoem} />
			<BottomNav />
		</article>
	);
}
