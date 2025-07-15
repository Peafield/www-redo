import Subheading from "@/components/typography/Subheading";
import ThematicBreak from "@/components/visuals/ThematicBreak";
import type { Comment } from "@/types/posts";
import PoemCommentThread from "./PoemCommentThread";

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
		<section className="w-full sm:w-2/3 space-y-16">
			<ThematicBreak />
			<div>
				<Subheading
					text={`Comments (${totalComments})`}
					className="font-serif text-xl"
				/>
			</div>
			<div className="space-y-8">
				{comments.map((comment) => (
					<PoemCommentThread
						key={comment._id as string}
						comment={comment}
						onReplyClick={onReplyClick}
					/>
				))}
			</div>
		</section>
	);
}
