import { cn } from "@/utils/cn";

export default function PoemSkeleton({ className }: { className?: string }) {
	return (
		<article
			className={cn(
				"w-full h-full flex flex-col items-center justify-center gap-8 animate-pulse",
				className,
			)}
		>
			<div className="relative w-full sm:w-2/3 aspect-3/2 drop-shadow-2xl rounded-2xl">
				<div className="w-full h-full bg-classy-mauve rounded-2xl" />
			</div>
			<div className="w-full flex items-center justify-end">
				<div className="h-4 w-1/4 rounded bg-classy-mauve" />
			</div>
			<div className="prose lg:prose-lg w-full mx-auto mb-4">
				<p className="h-4 w-full rounded bg-classy-mauve" />
				<p className="h-4 w-full rounded bg-classy-mauve" />
				<p className="h-4 w-1/2 rounded bg-classy-mauve" />
				<p className="h-4 w-full rounded bg-classy-mauve" />
				<p className="h-4 w-full rounded bg-classy-mauve" />
			</div>
		</article>
	);
}
