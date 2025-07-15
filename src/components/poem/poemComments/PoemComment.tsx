import { formatDistanceToNow } from "date-fns";
import type { Comment } from "@/types/posts";
import { cn } from "@/utils/cn";

type PoemCommentProps = {
	comment: Comment;
	onReplyClick: () => void;
	isReply: boolean;
};

export default function PoemComment({
	comment,
	onReplyClick,
	isReply = false,
}: PoemCommentProps) {
	const timeAgo = formatDistanceToNow(new Date(comment.date), {
		addSuffix: true,
	});

	return (
		<div
			className={cn("flex flex-col space-y-2", {
				"border-l border-classy-mauve/80 pl-4 ml-8": isReply,
			})}
		>
			<div className="flex flex-col items-start font-serif text-shady-character">
				<span className="font-bold">{comment.author}</span>
				<span className="text-xs text-gray-500">{timeAgo}</span>
			</div>
			<p className="text-sm text-shady-character font-serif">
				{comment.content}
			</p>
			<button
				type="button"
				onClick={onReplyClick}
				className="text-sm text-left text-shady-character/75 font-serif cursor-pointer hover:text-classy-mauve"
			>
				Reply
			</button>
		</div>
	);
}
