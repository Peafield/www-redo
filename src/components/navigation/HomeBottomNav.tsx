import Link from "next/link";

export default function HomeBottomNav() {
	return (
		<section className="w-full flex items-center justify-around">
			<Link
				href="/archive"
				className="p-4 border-[1px] border-pink-lemonade rounded-xl transform transition-all shadow-[6px_6px_12px_#edd9db,-6px_-6px_12px_#fff9fd] active:shadow-[inset_4px_4px_12px_#edd9db,-4px_-4px_12px_#fff9fd]"
			>
				<h4 className="text-shady-character font-display font-bold text-2xl">
					Archive
				</h4>
			</Link>
			<Link
				href="/about"
				className="p-4 border-[1px] border-pink-lemonade rounded-xl transform transition-all shadow-[6px_6px_12px_#edd9db,-6px_-6px_12px_#fff9fd] active:shadow-[inset_4px_4px_12px_#edd9db,-4px_-4px_12px_#fff9fd]"
			>
				<h4 className="text-shady-character font-display font-bold text-2xl">
					About
				</h4>
			</Link>
		</section>
	);
}
