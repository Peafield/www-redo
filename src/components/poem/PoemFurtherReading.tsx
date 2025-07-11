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
						className="group flex items-center space-x-4 text-shady-character hover:text-classy-mauve transition-colors duration-300 ease-in-out"
					>
						<ChevronLeftIcon className="size-10 " />
						<div className="flex flex-col w-full">
							<span className="font-serif text-sm uppercase tracking-wider">
								Previous
							</span>
							<span className="font-bold font-display text-classy-mauve capitalize tracking-wide">
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
						className="group flex items-center justify-end space-x-4 text-shady-character hover:text-classy-mauve transition-colors duration-300 ease-in-out"
					>
						<div className="flex flex-col w-full">
							<span className="font-serif text-sm uppercase tracking-wider text-right">
								Next
							</span>
							<span className="font-bold font-display text-classy-mauve capitalize tracking-wide text-right">
								{previousPoem.title}
							</span>
						</div>
						<ChevronRightIcon className="size-10" />
					</Link>
				)}
			</div>
		</div>
	);
}
