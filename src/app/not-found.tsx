import Link from "next/link";
import ArrowIcon from "@/components/svgs/ArrowIcon";

export default function NotFound() {
	return (
		<section className="w-full h-full flex-1 flex flex-col items-center justify-center gap-6 text-center">
			<h2 className="text-4xl font-bold text-shady-character font-display">
				404 - Page Not Found
			</h2>
			<h2 className="text-2xl text-shady-character font-display">
				Hmm... That page doesn't seem to exist.
			</h2>
			<Link
				href={"/"}
				className="group flex items-center justify-center"
				replace
			>
				<p className="text-shady-character font-serif mr-2 group-hover:text-classy-mauve transition-colors duration-300 ease-in-out">
					Go back home
				</p>
				<ArrowIcon className="text-shady-character size-3.5 group-hover:text-classy-mauve transition-colors duration-300 ease-in-out" />
			</Link>
		</section>
	);
}
