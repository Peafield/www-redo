import type { IconProps } from "@/types/components";

export default function ChevronDownIcon({ className }: IconProps) {
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
			<title>Chevron Down</title>
			<path d="m6 9 6 6 6-6" />
		</svg>
	);
}
