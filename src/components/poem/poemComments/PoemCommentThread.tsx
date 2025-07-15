import type { Comment } from "@/types/posts";
import PoemComment from "./PoemComment";

type PoemCommentThreadProps = {
	comment: Comment;
	onReplyClick: (commentId: string) => void;
};

export default function PoemCommentThread({
	comment,
	onReplyClick,
}: PoemCommentThreadProps) {
	return (
		<div className="flex flex-col space-y-4">
			<PoemComment
				comment={comment}
				onReplyClick={() => onReplyClick(comment._id as string)}
				isReply={false}
			/>
			{comment.replies && comment.replies.length > 0 && (
				<div className="space-y-4 pl-6 sm:pl-10 border-l-2 border-classy-mauve/20 ml-4">
					{comment.replies.map((reply) => (
						<PoemCommentThread
							key={reply._id as string}
							comment={reply}
							onReplyClick={onReplyClick}
						/>
					))}
				</div>
			)}
		</div>
	);
}
