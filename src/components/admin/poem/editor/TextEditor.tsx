"use client";

import HardBreak from "@tiptap/extension-hard-break";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useDebouncedCallback } from "use-debounce";
import { PhotoUploadIcon, SaveIcon } from "@/components/svgs/toolbarIcons";
import type { PostEdit } from "@/types/posts";
import PoemEditorImage from "./PoemEditorImage";
import { Toolbar } from "./Toolbar";

interface TextEditorProps {
	post: PostEdit;
	onChange: (updatedPost: PostEdit) => void;
	handleSave: () => void;
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
	handleSave,
	onChange,
	disabled,
}: TextEditorProps) {
	const debouncedOnChange = useDebouncedCallback((newContent: string) => {
		onChange({ ...post, content: newContent });
	}, 300);

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			CustomHardBreak,
			TextAlign.configure({ types: ["heading", "paragraph"] }),
			Placeholder.configure({ placeholder: "Write your poem here..." }),
		],
		content: post.content,
		immediatelyRender: false,
		onUpdate: ({ editor }) => {
			debouncedOnChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class: "prose max-w-full focus:outline-none",
			},
		},
	});

	return (
		<div className="h-full w-full sm:w-2/3 flex flex-col gap-4 p-4">
			<div className="flex flex-col items-stretch gap-4">
				{(post.image_url || post.image) && (
					<div className="w-full flex items-center justify-center">
						<PoemEditorImage imageSrc={post.image_url || post.image} />
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
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) =>
								onChange({ ...(post as PostEdit), image: e.target.files?.[0] })
							}
						/>
						<button
							type="submit"
							onClick={handleSave}
							disabled={disabled}
							className="inline-flex items-center p-2 border border-transparent text-base font-medium rounded-md shadow-sm font-serif text-pink-lemonade bg-shady-character hover:bg-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve cursor-pointer transition-colors duration-300 ease-in-out"
						>
							<SaveIcon className="size-5" />
							<span className="ml-2 text-sm font-medium">
								{" "}
								{disabled ? "Saving..." : "Save Poem"}
							</span>
						</button>
					</div>
					{editor && <Toolbar editor={editor} />}
				</div>
			</div>

			<input
				type="text"
				value={post.title}
				onChange={(e) =>
					onChange({ ...(post as PostEdit), title: e.target.value })
				}
				placeholder="Poem title"
				className="block w-full font-serif placeholder:text-shady-character/50 text-xl p-4 rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve bg-white/50"
			/>

			<div className="flex-1 overflow-y-auto block font-serif text-shady-character/50 p-4 rounded-md border-shady-character shadow-sm focus:border-classy-mauve focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-classy-mauve bg-white/50">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
}
