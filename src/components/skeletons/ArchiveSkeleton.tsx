function ArchivePoemCardSkeleton() {
	return (
		<div className="w-full flex-shrink-0 flex items-center justify-center gap-4">
			<div className="aspect-3/2 w-1/2 rounded-2xl bg-classy-mauve" />
			<div className="mt-2 w-1/2 flex flex-col gap-2">
				<div className="h-4 rounded bg-classy-mauve" />
				<div className="h-3 w-full rounded bg-classy-mauve" />
			</div>
		</div>
	);
}

export default function ArchiveSkeleton() {
	return (
		<section className="h-full flex-1 flex flex-col gap-6 w-full animate-pulse">
			<div className="bg-classy-mauve mb-4 w-1/4 h-8 rounded" />
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
				<ArchivePoemCardSkeleton />
				<ArchivePoemCardSkeleton />
				<ArchivePoemCardSkeleton />
				<ArchivePoemCardSkeleton />
				<ArchivePoemCardSkeleton />
			</div>
		</section>
	);
}
