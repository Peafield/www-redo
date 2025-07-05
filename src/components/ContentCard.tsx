"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { IoIosCheckmark, IoMdShareAlt } from "react-icons/io";

type ContentCardProps = {
	content: string;
	showShareButton: boolean;
	date?: string;
	className?: string;
};

const ContentCard = ({
	content,
	showShareButton,
	date,
	className,
}: ContentCardProps) => {
	const [linkCopied, setLinkCopied] = useState(false);
	const isHTML = (str: string) => {
		return /<[a-z][\s\S]*>/i.test(str);
	};

	useEffect(() => {
		if (linkCopied) {
			setTimeout(() => {
				setLinkCopied(false);
			}, 2000);
		}
	}, [linkCopied]);

	const handleCopyShareLink = () => {
		navigator.clipboard.writeText(window.location.href);
		setLinkCopied(true);
	};

	const renderContent = () => {
		if (isHTML(content)) {
			return (
				<div
					dangerouslySetInnerHTML={{ __html: content }}
					className="mt-4 h-full max-w-full break-words p-8 font-lato text-xl font-medium focus:outline-primary/35"
				/>
			);
		}

		return (
			<p className="mt-4 h-full max-w-full break-words p-8 font-lato text-xl font-medium focus:outline-primary/35">
				{content}
			</p>
		);
	};

	return (
		<div
			className={clsx(
				"relative mx-4 flex flex-col items-center rounded bg-stone-50 shadow-lg",
				className,
			)}
		>
			{date && (
				<div className="flex items-center justify-center gap-x-4 border-b-2 p-2">
					<h3 className="text-center font-lato font-medium text-gray-700 md:text-xl">
						{date}
					</h3>
					{showShareButton && (
						<div className="relative">
							<button
								onClick={handleCopyShareLink}
								className="group relative flex items-center justify-center rounded-full border bg-primary p-2 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-secondary hover:shadow-xl"
							>
								{/* Tooltip */}
								<div className="invisible absolute -top-8 z-50 opacity-0 transition-all duration-700 group-hover:visible group-hover:opacity-100">
									<div className="rounded bg-gray-800 px-2 py-1">
										<p className="whitespace-nowrap text-sm text-white">
											{linkCopied ? "Copied!" : "Share"}
										</p>
										<div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
									</div>
								</div>
								{/* Icons */}
								<div className="relative size-4">
									<div
										className={`absolute inset-0 transition-all duration-300 ease-in-out${
											linkCopied
												? "rotate-180 opacity-0"
												: "rotate-0 opacity-100"
										}`}
									>
										<IoMdShareAlt className="size-4" />
									</div>
									<div
										className={`absolute inset-0 transition-all duration-300 ease-in-out${
											linkCopied
												? "rotate-0 opacity-100"
												: "-rotate-180 opacity-0"
										}`}
									>
										<IoIosCheckmark className="size-4" />
									</div>
								</div>
							</button>
						</div>
					)}
				</div>
			)}
			{renderContent()}
		</div>
	);
};

export default ContentCard;
