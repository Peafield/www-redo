import { Suspense } from "react";
import Archive from "@/components/archive/Archive";
import ArchiveSkeleton from "@/components/skeletons/ArchiveSkeleton";
import { fetchArchivePosts } from "../actions/fetchArchivePosts";

export const dynamic = "force-dynamic";

export default function ArchivePage() {
	return (
		<Suspense fallback={<ArchiveSkeleton />}>
			<FetchArchivePosts />
		</Suspense>
	);
}

async function FetchArchivePosts() {
	const postData = await fetchArchivePosts({});
	return <Archive postData={postData} />;
}

export const metadata = {
	title: "Wendi's Worminghall Whimsies Archive",
	description: "The archive of all poems by Wendi Coles",
};
