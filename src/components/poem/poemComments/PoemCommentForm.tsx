"use client";

import { useActionState, useEffect, useImperativeHandle, useRef } from "react";
import { submitCommentAction } from "@/app/actions/submitCommentAction";

export type PoemCommentFormHandle = {
	focusAuthorInput: () => void;
	formRef: React.RefObject<HTMLFormElement | null>;
};

type PoemCommentFormProps = {
	poemId: string;
	replyToCommentId: string | null;
	onCancelReply: () => void;
};

export default function PoemCommentForm({
	poemId,
	ref,
	replyToCommentId,
	onCancelReply,
}: PoemCommentFormProps & { ref: React.Ref<PoemCommentFormHandle> }) {
	const formRef = useRef<HTMLFormElement>(null);
	const authorInputRef = useRef<HTMLInputElement>(null);
	const [commentState, submitAction, isPending] = useActionState(
		submitCommentAction,
		null,
	);

	useImperativeHandle(ref, () => ({
		focusAuthorInput: () => {
			authorInputRef.current?.focus();
		},
		formRef: formRef,
	}));

	useEffect(() => {
		commentState?.success && onCancelReply();
	}, [commentState?.success, onCancelReply]);

	const formAction = (formData: FormData) => {
		formRef.current?.reset();
		submitAction(formData);
	};

	return (
		<form ref={formRef} action={formAction} className="my-12 w-full sm:w-2/3">
			<input type="hidden" name="poemId" value={poemId} />
			{replyToCommentId && (
				<input type="hidden" name="replyToCommentId" value={replyToCommentId} />
			)}
			<div className="hidden" aria-hidden="true">
				<label htmlFor="honeypot">Do not fill this out</label>
				<input
					type="text"
					id="honeypot"
					name="honeypot"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>
			<h3 className="text-xl font-bold mb-4 font-serif text-shady-character">
				{replyToCommentId ? "Reply to comment" : "Leave a comment"}
			</h3>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="author"
						className="block text-sm font-medium text-shady-character sr-only"
					>
						Name
					</label>
					<input
						ref={authorInputRef}
						className="block w-full font-serif placeholder:text-shady-character/50 p-2 rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve bg-white/50"
						id="author"
						name="author"
						placeholder="Your Name"
						type="text"
						required
						autoComplete="on"
					/>
				</div>
				{commentState?.errors?.author && (
					<p className="font-serif font-bold text-sm text-classy-mauve">
						{commentState?.errors?.author[0]}
					</p>
				)}
				<div>
					<label
						className="block text-sm font-medium text-shady-character sr-only"
						htmlFor="comment"
					>
						Comment
					</label>
					<textarea
						className="block w-full font-serif placeholder:text-shady-character/50 p-2 rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve  bg-white/50"
						id="comment"
						name="comment"
						placeholder="Write your comment..."
						rows={4}
						required
						autoComplete="off"
					/>
				</div>
				{commentState?.errors?.content && (
					<p className="font-serif font-bold text-sm text-classy-mauve">
						{commentState?.errors?.content[0]}
					</p>
				)}
				<div>
					<div className="flex items-center justify-between w-full">
						<button
							className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm font-serif text-pink-lemonade bg-shady-character mb-4 hover:bg-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve cursor-pointer transition-colors duration-300 ease-in-out"
							type="submit"
							disabled={isPending}
						>
							{isPending ? "Submitting..." : "Post comment"}
						</button>
						{replyToCommentId && (
							<button
								className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm font-serif text-pink-lemonade bg-shady-character mb-4 hover:bg-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve cursor-pointer transition-colors duration-300 ease-in-out"
								type="button"
								onClick={onCancelReply}
							>
								Cancel
							</button>
						)}
					</div>
					{commentState?.success === true && (
						<>
							<p className="font-serif font-bold text-sm text-classy-mauve mb-4">
								Comment submitted successfully!
							</p>
							<p className="font-serif font-bold text-sm text-classy-mauve">
								Comments are moderated before being published.
							</p>
						</>
					)}
					{commentState?.success === false &&
						(!commentState?.errors?.content ||
							!commentState?.errors?.author) && (
							<p className="font-serif font-bold text-sm text-classy-mauve">
								Sorry, something's gone wrong. Please try again.
							</p>
						)}
				</div>
			</div>
		</form>
	);
}
