import Link from "next/link";
import ThematicBreak from "../visuals/ThematicBreak";

export default function BottomNav() {
	return (
		<section className="w-full flex flex-col items-center justify-around gap-4 sm:mt-16">
			<ThematicBreak />
			<p className="text-classy-mauve text-sm font-serif">
				A collection of poems and thoughts by <em>Wendi Coles</em>.
			</p>
			<div className="w-full flex items-center justify-center">
				<Link href="/archive" className="pr-2 border-r-2 border-classy-mauve">
					<h4 className="text-shady-character font-display text-sm hover:text-classy-mauve">
						Archive
					</h4>
				</Link>
				<Link href="/about" className="px-2 border-r-2 border-classy-mauve">
					<h4 className="text-shady-character font-display text-sm hover:text-classy-mauve">
						About
					</h4>
				</Link>
				<Link href="/contact" className="pl-2">
					<h4 className="text-shady-character font-display text-sm hover:text-classy-mauve">
						Contact
					</h4>
				</Link>
			</div>
		</section>
	);
}
