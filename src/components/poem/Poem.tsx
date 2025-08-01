"use client";

import { useRef, useState } from "react";
import type { Comment, Post } from "@/types/posts";
import BottomNav from "../navigation/BottomNav";
import PoemContent from "./PoemContent";
import PoemFurtherReading from "./PoemFurtherReading";
import PoemImage from "./PoemImage";
import PoemActions from "./poemActions/PoemActions";
import PoemCommentForm, {
	type PoemCommentFormHandle,
} from "./poemComments/PoemCommentForm";
import PoemComments from "./poemComments/PoemComments";

type PoemProps = {
	poem: Post;
	poemComments: Comment[] | null;
	previousPoem: { _id: string; title: string; image_url: string } | null;
	nextPoem: { _id: string; title: string; image_url: string } | null;
};

export default function PoemPage({
	poem,
	poemComments,
	previousPoem,
	nextPoem,
}: PoemProps) {
	const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);
	const commentFormRef = useRef<PoemCommentFormHandle>(null);

	const handleReplyClick = (commentId: string) => {
		setReplyToCommentId(commentId);
		commentFormRef.current?.focusAuthorInput();
		const formElement = commentFormRef.current?.formRef
			?.current as HTMLFormElement | null;
		if (formElement) {
			formElement.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	const handleCancelReplyClick = () => {
		setReplyToCommentId(null);
	};

	return (
		<article className="w-full sm:w-2/3 mx-auto h-full flex flex-col items-center justify-center gap-8">
			<PoemImage imageUrl={poem.image_url} title={poem.title} />
			<PoemActions date={poem.date} />
			<PoemContent content={poem.content} />
			{poemComments && poemComments.length > 0 && (
				<PoemComments comments={poemComments} onReplyClick={handleReplyClick} />
			)}
			<PoemCommentForm
				ref={commentFormRef}
				poemId={poem._id as string}
				poemTitle={poem.title}
				replyToCommentId={replyToCommentId}
				onCancelReply={handleCancelReplyClick}
			/>
			<PoemFurtherReading previousPoem={previousPoem} nextPoem={nextPoem} />
			<BottomNav />
		</article>
	);
}
