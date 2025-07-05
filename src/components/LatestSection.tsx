import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Post } from "@/types/posts";

type LastestPostProps = {
	latestPost?: Post | null;
};

const LatestPost = ({ latestPost }: LastestPostProps) => {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		setIsVisible(true);
	}, []);

	const handleClick = () => {
		router.push(`/poem/${latestPost?._id}`);
	};

	return (
		// biome-ignore lint/a11y/useSemanticElements: <explanation>
		<div
			className={`relative h-full cursor-pointer transition-opacity duration-700 ease-in-out ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
			onClick={handleClick}
			role="link"
			tabIndex={0}
			onKeyDown={handleClick}
		>
			<div className="flex size-full items-center justify-center bg-gray-900/35">
				<div
					className={`w-full transition-transform duration-700 ease-in-out ${
						isVisible ? "translate-y-0" : "translate-y-10"
					}`}
				>
					<div className="flex w-full items-center justify-center">
						<div className="grid grid-cols-2 md:gap-x-16">
							<div className="flex items-center justify-center">
								<h2 className="text-center font-lato font-bold text-white mobile:text-4xl md:text-7xl">
									{latestPost?.title}
								</h2>
							</div>
							<div className="flex items-center justify-center rounded-l-lg bg-gray-900/35 p-4">
								<h3 className="text-center font-playfair_display font-medium leading-relaxed text-white md:text-4xl">
									{`"${latestPost?.preview_text}"`}
								</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LatestPost;
