import { formatDistanceToNow } from "date-fns";
import type { Comment } from "@/types/posts";

type PoemCommentProps = {
	comment: Comment;
	onReplyClick: () => void;
};

export default function PoemComment({
	comment,
	onReplyClick,
}: PoemCommentProps) {
	const timeAgo = formatDistanceToNow(new Date(comment.date), {
		addSuffix: true,
	});

	return (
		<div className="flex flex-col space-y-2">
			<div className="flex flex-col items-start space-x-4 font-serif text-shady-character">
				<span className="font-bold">{comment.author}</span>
				<span className="text-xs text-gray-500">{timeAgo}</span>
			</div>
			<p className="text-sm text-shady-character font-serif">
				{comment.content}
			</p>
			<button
				type="button"
				onClick={onReplyClick}
				className="text-sm mt-2 text-left text-shady-character/75 font-serif cursor-pointer hover:text-classy-mauve"
			>
				Reply
			</button>
		</div>
	);
}
