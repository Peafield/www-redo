import type { Comment } from "@/types/posts";
import PoemComment from "./PoemComment";

type PoemCommentsProps = {
	comments: Comment[];
};

export default function PoemComments({ comments }: PoemCommentsProps) {
	const totalComments = comments.length;
	return (
		<section className="w-full sm:w-2/3">
			<div className="mt-24 border-t border-classy-mauve pt-12">
				<h2 className="text-xl font-bold mb-8 font-serif text-shady-character">
					Comments ({totalComments})
				</h2>
			</div>
			<div className="space-y-8">
				{comments.map((comment) => (
					<PoemComment key={comment._id as string} comment={comment} />
				))}
			</div>
		</section>
	);
}
