"use client";

import { HardBreak } from "@tiptap/extension-hard-break";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import {
	MdOutlineFormatAlignCenter,
	MdOutlineFormatAlignJustify,
	MdOutlineFormatAlignLeft,
	MdOutlineFormatAlignRight,
	MdOutlineFormatBold,
	MdOutlineFormatItalic,
	MdOutlineFormatUnderlined,
	MdOutlineSave,
} from "react-icons/md";
import { TbPhotoPlus } from "react-icons/tb";
import type { PostUpdate } from "@/types/posts";
import { usePostsCreationStore } from "../../../store/postsStore";

interface TextEditorProps {
	post: PostUpdate;
	handleSave: (post: PostUpdate) => void;
	disabled: boolean;
}

const TextEditor = ({ post, handleSave, disabled }: TextEditorProps) => {
	const { setNewPost } = usePostsCreationStore();

	const CustomHardBreak = HardBreak.extend({
		addKeyboardShortcuts() {
			return {
				...HardBreak.config.keyboardShortcuts,
				Enter: () => this.editor.commands.setHardBreak(),
			};
		},
	});

	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Placeholder.configure({
				placeholder: "Write your poem here...",
				emptyNodeClass: "is-editor-empty",
			}),
			CustomHardBreak,
		],
		content: post.content,
		onUpdate: ({ editor }) => {
			if (editor.isEmpty) {
				setNewPost({ ...post, content: "" });
			} else {
				setNewPost({ ...post, content: editor.getHTML() });
			}
		},
		editorProps: {
			attributes: {
				class:
					"max-w-full h-full focus:outline-primary/35 p-8 break-words text-xl",
			},
		},
		immediatelyRender: false,
	});

	useEffect(() => {
		if (editor && editor.getHTML() !== post.content) {
			editor.commands.setContent(post.content || "");
		}
	}, [editor, post.content]);

	useEffect(() => {
		return () => {
			if (editor) {
				editor.destroy();
			}
		};
	}, [editor]);

	if (!editor) {
		return null;
	}

	return (
		<div className="flex size-full flex-col items-center p-4">
			<div className="mb-8 flex flex-wrap gap-2 rounded border p-2 shadow-lg">
				<button
					onClick={() => editor.chain().focus().toggleBold().run()}
					className={`mr-2 px-2 py-1 ${
						editor.isActive("bold") ? "rounded bg-secondary" : ""
					}`}
				>
					<MdOutlineFormatBold className="size-6" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleItalic().run()}
					className={`mr-2 px-2 py-1 ${
						editor.isActive("italic") ? "rounded bg-secondary" : ""
					}`}
				>
					<MdOutlineFormatItalic className="size-6" />
				</button>
				<button
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					className={`mr-2 px-2 py-1 ${
						editor.isActive("underline") ? "rounded bg-secondary" : ""
					}`}
				>
					<MdOutlineFormatUnderlined className="size-6" />
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
					className={`mr-2 px-2 py-1 ${
						editor.isActive({ textAlign: "left" }) ? "rounded bg-secondary" : ""
					}`}
				>
					<MdOutlineFormatAlignLeft className="size-6" />
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
					className={`mr-2 px-2 py-1 ${
						editor.isActive({ textAlign: "center" })
							? "rounded bg-secondary"
							: ""
					}`}
				>
					<MdOutlineFormatAlignCenter className="size-6" />
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
					className={`mr-2 px-2 py-1 ${
						editor.isActive({ textAlign: "right" })
							? "rounded bg-secondary"
							: ""
					}`}
				>
					<MdOutlineFormatAlignRight className="size-6" />
				</button>
				<button
					onClick={() => editor.chain().focus().setTextAlign("justify").run()}
					className={`px-2 py-1 ${
						editor.isActive({ textAlign: "justify" })
							? "rounded bg-secondary"
							: ""
					}`}
				>
					<MdOutlineFormatAlignJustify className="size-6" />
				</button>
				<label
					htmlFor="fileInput"
					className="flex cursor-pointer items-center justify-center rounded border p-2 hover:bg-secondary"
				>
					<TbPhotoPlus className="size-6" />
				</label>
				<input
					id="fileInput"
					type="file"
					className="hidden"
					onChange={(e) => setNewPost({ ...post, image: e.target.files?.[0] })}
				/>
				{!disabled ? (
					<button
						onClick={() => handleSave(post)}
						className="flex flex-row items-center justify-center gap-x-2 rounded border p-2 hover:bg-secondary"
					>
						<p className="font-lato font-bold">Save</p>
						<MdOutlineSave className="size-6" />
					</button>
				) : (
					<button
						disabled
						type="button"
						className="me-2 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						<svg
							aria-hidden="true"
							role="status"
							className="me-3 inline size-4 animate-spin text-white"
							viewBox="0 0 100 101"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
								fill="#E5E7EB"
							/>
							<path
								d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
								fill="currentColor"
							/>
						</svg>
						Loading...
					</button>
				)}
			</div>

			<div className="mb-4 w-full">
				<input
					type="text"
					value={post.title}
					onChange={(e) => setNewPost({ ...post, title: e.target.value })}
					placeholder="Enter poem title..."
					className="w-full rounded border p-4 font-lato focus:outline-primary/35"
				/>
			</div>
			<EditorContent
				editor={editor}
				className="w-full flex-1 overflow-hidden rounded border [&_.ProseMirror]:whitespace-pre-wrap [&_.ProseMirror]:break-words"
			/>
		</div>
	);
};

export default TextEditor;
