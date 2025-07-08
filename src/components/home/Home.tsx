import { cn } from "@/utils/cn";
import HomeLatest from "./HomeLastest";
import { HomeRecentCarousel } from "./HomeRecentCarousel";

type HomeProps = {
	className?: string;
};

const testPost = {
	title: "My Last Living Son",
	src: "/placeholder.png",
	preview:
		"Lorem ipsum ullamco ad est anim do dolor velit. Irure aliquip sit nulla ut culpa. Fugiat laborum nisi non reprehenderit magna pariatur et excepteur esse...",
};

export default function Home({ className }: HomeProps) {
	return (
		<section
			className={cn("flex flex-col gap-4 w-full h-full", {
				[className as string]: !!className,
			})}
		>
			<HomeLatest
				title={testPost.title}
				src={testPost.src}
				preview={testPost.preview}
			/>
			<HomeRecentCarousel />
		</section>
	);
}
