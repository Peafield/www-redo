import type { IconProps } from "@/types/components";

export default function ItalicIcon({ className }: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
		>
			<title>Italic</title>
			<line x1="19" x2="10" y1="4" y2="4" />
			<line x1="14" x2="5" y1="20" y2="20" />
			<line x1="15" x2="9" y1="4" y2="20" />
		</svg>
	);
}
