"use client";

import HardBreak from "@tiptap/extension-hard-break";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import { PhotoUploadIcon, SaveIcon } from "@/components/svgs/toolbarIcons";
import type { PostEdit } from "@/types/posts";
import PoemEditorImage from "./PoemEditorImage";
import { Toolbar } from "./Toolbar";

type SavePoemState = {
	success?: boolean;
	errors?: {
		title?: string[];
		content?: string[];
		image?: string[];
	};
	message?: string;
} | null;

interface TextEditorProps {
	post: PostEdit;
	savePoemState: SavePoemState;
	formAction: (payload: FormData) => void;
	disabled: boolean;
}

const CustomHardBreak = HardBreak.extend({
	addKeyboardShortcuts() {
		return {
			Enter: () => this.editor.commands.setHardBreak(),
		};
	},
});

export default function TextEditor({
	post,
	formAction,
	savePoemState,
	disabled,
}: TextEditorProps) {
	console.log("savepoemsatate:", savePoemState);
	const [title, setTitle] = useState(post.title || "");
	const [content, setContent] = useState(post.content || "");
	const [imagePreview, setImagePreview] = useState<string | Blob | null>(
		post.image_url || post.image || null,
	);
	const [formKey, setFormKey] = useState(0);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			CustomHardBreak,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Placeholder.configure({ placeholder: "Write your poem here..." }),
		],
		content: content,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			setContent(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: "prose max-w-full focus:outline-none",
			},
		},
	});

	useEffect(() => {
		if (savePoemState?.success && savePoemState.message) {
			setFormKey((prevKey) => prevKey + 1);
		}
	}, [savePoemState]);

	return (
		<form
			key={formKey}
			action={formAction}
			className="h-full w-full sm:w-2/3 flex flex-col gap-4 p-4"
		>
			<div className="flex flex-col items-stretch gap-4">
				{imagePreview && (
					<div className="w-full flex items-center justify-center">
						<PoemEditorImage imageSrc={imagePreview} />
					</div>
				)}
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4">
					<div className="flex items-center gap-2">
						<label
							htmlFor="fileInput"
							className="flex items-center p-2 border border-transparent text-base font-medium rounded-md shadow-sm font-serif text-pink-lemonade bg-shady-character hover:bg-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve cursor-pointer transition-colors duration-300 ease-in-out"
							title="Add Image"
						>
							<PhotoUploadIcon className="size-5" />
							<span className="ml-2 text-sm font-medium">
								{post.image || post.image_url ? "Change Image" : "Add Image"}
							</span>
						</label>
						<input
							id="fileInput"
							name="image"
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) => {
								const file = e.target.files?.[0];
								if (file) {
									setImagePreview(file);
								}
							}}
						/>
						<button
							type="submit"
							disabled={disabled}
							className="inline-flex items-center p-2 border border-transparent text-base font-medium rounded-md shadow-sm font-serif text-pink-lemonade bg-shady-character hover:bg-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve cursor-pointer transition-colors duration-300 ease-in-out disabled:opacity-50"
						>
							<SaveIcon className="size-5" />
							<span className="ml-2 text-sm font-medium">
								{disabled ? "Saving..." : "Save Poem"}
							</span>
						</button>
					</div>
					{editor && <Toolbar editor={editor} />}
				</div>
			</div>

			<input
				type="text"
				defaultValue={title}
				name="title"
				placeholder="Poem title"
				className="block w-full font-serif placeholder:text-shady-character/50 text-xl p-4 rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve bg-white/50"
			/>
			{savePoemState?.errors?.title && (
				<p className="text-red-500 text-sm">{savePoemState.errors.title[0]}</p>
			)}

			<input type="hidden" name="content" value={content} />

			<div className="flex-1 overflow-y-auto block font-serif text-shady-character/50 p-4 rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve bg-white/50">
				<EditorContent editor={editor} />
			</div>

			{savePoemState?.errors?.content && (
				<p className="text-red-500 text-sm">
					{savePoemState.errors.content[0]}
				</p>
			)}
		</form>
	);
}
