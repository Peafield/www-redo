import Link from "next/link";
import ChevronLeftIcon from "../svgs/ChevronLeftIcon";
import ChevronRightIcon from "../svgs/ChevronRightIcon";

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
			<div className="justify-self-start w-full">
				{nextPoem && (
					<Link
						href={`/poem/${nextPoem._id}`}
						className="group flex items-center text-shady-character hover:text-classy-mauve transition-colors duration-300 ease-in-out"
					>
						<ChevronLeftIcon className="size-8 sm:size-10 flex-shrink-0" />
						<div className="flex flex-col justify-center w-full">
							<span className="font-serif text-xs sm:text-sm uppercase sm:tracking-wider">
								Previous
							</span>
							<span className="font-bold font-display text-xs sm:text-sm text-classy-mauve capitalize sm:tracking-wide">
								{nextPoem.title}
							</span>
						</div>
					</Link>
				)}
			</div>
			<div className="justify-self-end w-full">
				{previousPoem && (
					<Link
						href={`/poem/${previousPoem._id}`}
						className="group flex items-center justify-end text-shady-character hover:text-classy-mauve transition-colors duration-300 ease-in-out"
					>
						<div className="flex flex-col justify-center w-full">
							<span className="font-serif text-xs sm:text-sm uppercase sm:tracking-wider text-right">
								Next
							</span>
							<span className="font-bold text-xs sm:text-sm font-display text-classy-mauve capitalize sm:tracking-wide text-right">
								{previousPoem.title}
							</span>
						</div>
						<ChevronRightIcon className="size-8 sm:size-10 flex-shrink-0" />
					</Link>
				)}
			</div>
		</div>
	);
}
