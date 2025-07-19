"use client";

import { useActionState } from "react";
import { adminSavePoemAction } from "@/app/actions/adminSavePoemAction";
import type { PostEdit } from "@/types/posts";
import TextEditor from "./TextEditor";

interface PoemEditorProps {
	initialPost?: PostEdit;
}

export default function PoemEditor({ initialPost }: PoemEditorProps) {
	const [savePoemState, formAction, isPending] = useActionState(
		adminSavePoemAction,
		null,
	);

	return (
		<div className="h-screen flex items-center justify-center">
			<TextEditor
				post={initialPost || { _id: "", title: "", content: "" }}
				formAction={formAction}
				savePoemState={savePoemState}
				disabled={isPending}
			/>
		</div>
	);
}
