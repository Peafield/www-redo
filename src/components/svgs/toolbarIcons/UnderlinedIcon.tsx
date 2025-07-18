import type { IconProps } from "@/types/components";

export default function UnderlinedIcon({ className }: IconProps) {
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
			<title>Underlined</title>
			<path d="M6 4v6a6 6 0 0 0 12 0V4" />
			<line x1="4" x2="20" y1="20" y2="20" />
		</svg>
	);
}
