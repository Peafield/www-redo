import Archive from "@/components/archive/Archive";
import { fetchArchivePosts } from "../actions/fetchArchivePosts";

export default function ArchivePage() {
	return <FetchArchivePosts />;
}

async function FetchArchivePosts() {
	const postData = await fetchArchivePosts({});
	// TODO: Add skeleton
	return <Archive postData={postData} />;
}

export const metadata = {
	title: "Wendi's Worminghall Whimsies Archive",
	description: "The archive of all poems by Wendi Coles",
};
