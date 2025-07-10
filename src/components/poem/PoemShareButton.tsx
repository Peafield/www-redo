"use client";

import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import ShareIcon from "../svgs/ShareIcon";
import TickIcon from "../svgs/TickIcon";

export default function PoemShareButton() {
	const [linkCopied, setLinkCopied] = useState(false);
	useEffect(() => {
		if (linkCopied) {
			setTimeout(() => {
				setLinkCopied(false);
			}, 1000);
		}
	}, [linkCopied]);

	const handleCopyShareLink = () => {
		navigator.clipboard.writeText(window.location.href);
		setLinkCopied(true);
	};

	return (
		<button
			type="button"
			onClick={handleCopyShareLink}
			className="group font-bold font-display cursor-pointer flex items-center justify-end w-full sm:w-2xl mb-8"
		>
			<div>
				{linkCopied ? (
					<TickIcon
						className={cn(
							"size-3.5 mr-1 text-shady-character transform transition-colors duration-300 ease-in-out animate-fade-out group-hover:text-classy-mauve",
						)}
					/>
				) : (
					<ShareIcon className="size-3.5 mr-1 text-shady-character group-hover:text-classy-mauve transform transition-colors duration-300 ease-in-out" />
				)}
			</div>
			<h3 className="text-sm text-shady-character group-hover:text-classy-mauve transform transition-colors duration-300 ease-in-out">
				{linkCopied ? "Copied!" : "Share"}
			</h3>
		</button>
	);
}
