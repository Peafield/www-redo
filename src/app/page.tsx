import { Suspense } from "react";
import Home from "@/components/home/Home";
import HomeSkeleton from "@/components/skeletons/HomeSkeleton";
import { fetchLatestPosts } from "./actions/fetchLatestPosts";

export const dynamic = "force-dynamic";

export default function HomePage() {
	return (
		<Suspense fallback={<HomeSkeleton />}>
			<LatestPosts />
		</Suspense>
	);
}

async function LatestPosts() {
	const postData = await fetchLatestPosts();
	return <Home postData={postData} />;
}

export const metadata = {
	title: "Wendi's Worminghall Whimsies Home Page",
	description: "The latest poems by Wendi Coles",
};
