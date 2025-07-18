import type { IconProps } from "@/types/components";

export default function AlignCenterIcon({ className }: IconProps) {
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
			<title>Align Center</title>
			<path d="M17 12H7" />
			<path d="M19 18H5" />
			<path d="M21 6H3" />
		</svg>
	);
}
