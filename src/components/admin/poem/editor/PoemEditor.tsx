"use client";

import { useState } from "react";
import type { PostEdit } from "@/types/posts";
import TextEditor from "./TextEditor";

export default function PoemEditor() {
	const [post, setPost] = useState<PostEdit>({
		_id: "",
		title: "",
		content: "",
	});
	console.log(post);
	const [isSaving, setIsSaving] = useState(false);

	const handleSavePoem = async () => {
		setIsSaving(true);
		console.log("Saving post:", post);
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsSaving(false);
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<TextEditor
				post={post}
				onChange={setPost}
				handleSave={handleSavePoem}
				disabled={isSaving}
			/>
		</div>
	);
}
