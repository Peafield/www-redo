"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import {
	type AdminSavePoemActionResult,
	adminPatchPoemAction,
	adminSavePoemAction,
} from "@/app/actions/adminSavePoemAction";
import type { PostEdit } from "@/types/posts";
import TextEditor from "./TextEditor";

interface PoemEditorProps {
	initialPost: PostEdit | null;
}

export default function PoemEditor({ initialPost }: PoemEditorProps) {
	const router = useRouter();
	const actionToUse = initialPost ? adminPatchPoemAction : adminSavePoemAction;
	const [savePoemState, formAction, isPending] = useActionState<
		AdminSavePoemActionResult,
		FormData
	>(actionToUse, null);

	useEffect(() => {
		if (savePoemState?.success) {
			alert(savePoemState.message || "Poem saved successfully!");
			router.push("/admin");
		}
	}, [savePoemState, router]);

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
