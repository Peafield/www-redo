import type { IconProps } from "@/types/components";

export default function MenuIcon({ className }: IconProps) {
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
			<title>Menu</title>
			<path d="M4 12h16" />
			<path d="M4 18h16" />
			<path d="M4 6h16" />
		</svg>
	);
}
