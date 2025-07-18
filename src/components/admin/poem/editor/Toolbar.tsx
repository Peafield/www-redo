import type { Editor } from "@tiptap/react";
import {
	AlignCenterIcon,
	AlignLeftIcon,
	AlignRightIcon,
	BoldIcon,
	ItalicIcon,
	UnderlinedIcon,
} from "@/components/svgs/toolbarIcons";
import ToolbarButton from "./ToolbarButton";

type ToolbarProps = {
	editor: Editor;
};

export const Toolbar = ({ editor }: ToolbarProps) => {
	if (!editor) {
		return null;
	}

	return (
		<div className="inline-flex items-center justify-center gap-2 rounded-md shadow-sm bg-white/50">
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				isActive={editor.isActive("bold")}
			>
				<BoldIcon className="size-5" />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				isActive={editor.isActive("italic")}
			>
				<ItalicIcon className="size-5" />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				isActive={editor.isActive("underline")}
			>
				<UnderlinedIcon className="size-5" />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().setTextAlign("left").run()}
				isActive={editor.isActive({ textAlign: "left" })}
			>
				<AlignLeftIcon className="size-5" />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().setTextAlign("center").run()}
				isActive={editor.isActive({ textAlign: "center" })}
			>
				<AlignCenterIcon className="size-5" />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().setTextAlign("right").run()}
				isActive={editor.isActive({ textAlign: "right" })}
			>
				<AlignRightIcon className="size-5" />
			</ToolbarButton>
		</div>
	);
};
