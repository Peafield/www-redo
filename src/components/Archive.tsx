import type { Post } from "@/types/posts";
import PoemCard from "./PoemCard";

type ArchiveProps = {
	posts: Post[] | null;
};

const Archive = ({ posts }: ArchiveProps) => {
	if (!posts) return <p>Loading...</p>;
	return (
		<div className="mt-8 flex flex-col items-center">
			<div className="mb-8 w-1/2">
				<h1 className="text-center font-bold mobile:text-4xl md:text-6xl">
					Archive
				</h1>
			</div>
			<div className="flex w-full flex-wrap items-center justify-center gap-6">
				{posts.map((post) => (
					<div key={post._id.toString()}>
						<PoemCard post={post} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Archive;
