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
	previousPoem: { _id: string; title: string; image_url: string } | null;
	nextPoem: { _id: string; title: string; image_url: string } | null;
};

const comments: Comment[] = [
	{
		_id: "1",
		poemId: "1",
		date: "2025-05-11T13:48:00Z",
		author: "John Doe",
		content:
			"This is so beautifully written and deeply moving. Thank you for sharing your heart.",
	},
	{
		_id: "2",
		poemId: "2",
		date: "2025-06-11T14:00:00Z",
		author: "Jane Doe",
		content:
			"Your words resonate so much with me. It’s comforting to know others feel this way. Sending you strength.",
	},
	{
		_id: "3",
		poemId: "3",
		date: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
		author: "Peter Coles",
		content:
			"A vessel of grief... what a powerful and apt title. Your vulnerability is a gift. Thank you.",
	},
];

export default function PoemPage({ poem, previousPoem, nextPoem }: PoemProps) {
	return (
		<article className="w-full sm:w-2/3 mx-auto h-full flex flex-col items-center justify-center gap-8">
			<PoemImage imageUrl={poem.image_url} title={poem.title} />
			<PoemActions date={poem.date} />
			<PoemContent content={poem.content} />
			<PoemComments comments={comments} />
			<PoemCommentForm />
			<PoemFurtherReading previousPoem={previousPoem} nextPoem={nextPoem} />
			<BottomNav />
		</article>
	);
}
