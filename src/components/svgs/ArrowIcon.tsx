import type { IconProps } from "@/types/components";

export default function ArrowIcon({ className }: IconProps) {
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
			<title>Arrow</title>
			<path d="M18 8L22 12L18 16" />
			<path d="M2 12H22" />
		</svg>
	);
}
