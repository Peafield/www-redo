import { cn } from "@/utils/cn";
import HomeBottomNav from "../navigation/BottomNav";

function RecentCardSkeleton() {
	return (
		<div className="flex w-48 sm:w-1/2 flex-shrink-0 flex-col gap-2">
			<div className="aspect-3/2 w-full rounded-2xl bg-classy-mauve" />
			<div className="mt-2 space-y-2">
				<div className="h-4 w-3/4 rounded bg-classy-mauve" />
				<div className="h-3 w-full rounded bg-classy-mauve" />
			</div>
		</div>
	);
}

function RecentCarouselSkeleton() {
	return (
		<section>
			<div className="mb-4 h-8 w-48 rounded bg-classy-mauve" />
			<div className="flex gap-4 overflow-x-auto pb-4">
				<RecentCardSkeleton />
				<RecentCardSkeleton />
				<RecentCardSkeleton />
			</div>
		</section>
	);
}

function LatestPostSkeleton() {
	return (
		<section className="mb-4 flex w-full flex-col items-center justify-center">
			<div className="aspect-3/2 w-full rounded-2xl bg-classy-mauve sm:w-2/3" />
			<div className="mt-8 w-full space-y-3 p-4 sm:w-2/3">
				<div className="h-4 w-full rounded bg-classy-mauve" />
				<div className="h-4 w-5/6 rounded bg-classy-mauve" />
			</div>
		</section>
	);
}

export default function HomeSkeleton({ className }: { className?: string }) {
	return (
		<div className={cn("flex w-full animate-pulse flex-col gap-4", className)}>
			<LatestPostSkeleton />
			<RecentCarouselSkeleton />
			<HomeBottomNav />
		</div>
	);
}
