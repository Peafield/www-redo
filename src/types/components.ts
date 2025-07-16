export interface IconProps {
	className?: string;
}

export interface CommentModerationModal {
	type: "approve" | "reject";
	title: string;
	buttonTitle: "Approve" | "Reject";
	children: string;
	buttonClick: () => Promise<void>;
}
