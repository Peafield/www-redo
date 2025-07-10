import Image from "next/image";
import Link from "next/link";

type PoemFurtherReadingProps = {
	previousPoem: { _id: string; title: string; image_url: string } | null;
	nextPoem: { _id: string; title: string; image_url: string } | null;
};

export default function PoemFurtherReading({
	previousPoem,
	nextPoem,
}: PoemFurtherReadingProps) {
	return (
		<div className="grid grid-cols-2 gap-8 w-full">
			<div className="justify-self-start">
				{nextPoem && (
					<>
						<h2 className="text-classy-mauve font-serif font-bold">Previous</h2>
						<Link href={`/poem/${nextPoem._id as string}`}>
							<div className="relative w-48 aspect-3/2 drop-shadow-2xl rounded-sm">
								<Image
									src={`/api/image/${encodeURIComponent(nextPoem.image_url)}`}
									alt={`Image for ${nextPoem.title}`}
									fill
									className="rounded-2xl object-cover shadow-lg"
								/>
								<div
									className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent rounded-2xl z-10"
									aria-hidden="true"
								/>
								<h2 className="absolute bottom-2 left-2 w-1/4 tracking-wider text-xs font-display font-bold text-pink-lemonade z-20 capitalize">
									{nextPoem.title}
								</h2>
							</div>
						</Link>
					</>
				)}
			</div>
			<div className="justify-self-end">
				{previousPoem && (
					<>
						<h2 className="text-classy-mauve font-serif text-end font-bold">
							Next
						</h2>
						<Link href={`/poem/${previousPoem._id as string}`}>
							<div className="relative w-48 aspect-3/2 drop-shadow-2xl rounded-sm">
								<Image
									src={`/api/image/${encodeURIComponent(previousPoem.image_url)}`}
									alt={`Image for ${previousPoem.title}`}
									fill
									className="rounded-2xl object-cover shadow-lg"
								/>
								<div
									className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent rounded-2xl z-10"
									aria-hidden="true"
								/>
								<h2 className="absolute bottom-2 left-2 w-1/4 tracking-wider text-xs font-display font-bold text-pink-lemonade z-20 capitalize">
									{previousPoem.title}
								</h2>
							</div>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}
