import type { IconProps } from "@/types/components";

export default function AlignLeftIcon({ className }: IconProps) {
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
			<title>AlignLeft</title>
			<path d="M15 12H3" />
			<path d="M17 18H3" />
			<path d="M21 6H3" />
		</svg>
	);
}
