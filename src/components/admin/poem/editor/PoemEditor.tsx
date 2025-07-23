"use client";

import { useActionState, useEffect, useState } from "react";
import { adminSavePoemAction } from "@/app/actions/adminSavePoemAction";
import type { PostEdit } from "@/types/posts";
import TextEditor from "./TextEditor";

interface PoemEditorProps {
	initialPost: PostEdit | null;
}

// TODO: update adminSavePoemAction to both save new or patch existing poem

export default function PoemEditor({ initialPost }: PoemEditorProps) {
	const [savePoemState, formAction, isPending] = useActionState(
		adminSavePoemAction,
		null,
	);

	const [formKey, setFormKey] = useState(0);

	useEffect(() => {
		if (savePoemState?.success) {
			alert(savePoemState.message || "Poem saved successfully!");
			setFormKey((prevKey) => prevKey + 1);
		}
	}, [savePoemState]);

	return (
		<div className="h-screen flex items-center justify-center">
			<TextEditor
				key={formKey}
				post={initialPost || { _id: "", title: "", content: "" }}
				formAction={formAction}
				savePoemState={savePoemState}
				disabled={isPending}
			/>
		</div>
	);
}
