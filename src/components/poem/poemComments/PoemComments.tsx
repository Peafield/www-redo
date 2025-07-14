import type { Comment } from "@/types/posts";
import PoemComment from "./PoemComment";

type PoemCommentsProps = {
	comments: Comment[];
	onReplyClick: (commentId: string) => void;
};

export default function PoemComments({
	comments,
	onReplyClick,
}: PoemCommentsProps) {
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
					<PoemComment
						key={comment._id as string}
						comment={comment}
						onReplyClick={() => onReplyClick(comment._id as string)}
					/>
				))}
			</div>
		</section>
	);
}
