import { cn } from "@/utils/cn";

type ThematicBreakProps = {
	className?: string;
};

export default function ThematicBreak({ className }: ThematicBreakProps) {
	return (
		<div
			className={cn("w-full flex items-center justify-center", {
				[className as string]: !!className,
			})}
		>
			<hr className="h-px bg-classy-mauve border-0 w-2/3" />
		</div>
	);
}
