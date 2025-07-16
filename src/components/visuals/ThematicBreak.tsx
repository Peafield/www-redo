import { cn } from "@/utils/cn";

type ThematicBreakProps = {
	className?: string;
};

export default function ThematicBreak({ className }: ThematicBreakProps) {
	return (
		<div className="w-full flex items-center justify-center">
			<hr
				className={cn("h-px border-t border-classy-mauve/50 w-full", {
					[className as string]: !!className,
				})}
			/>
		</div>
	);
}
