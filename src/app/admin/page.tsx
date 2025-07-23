import { cookies } from "next/headers";
import { Suspense } from "react";
import Login from "@/components/admin/auth/Login";
import PoemManager from "@/components/admin/poem/management/PoemManager";
import verifyToken from "@/utils/verifyToken";
import { fetchArchivePosts } from "../actions/fetchArchivePosts";

export default async function AdminPage() {
	const cookieStore = await cookies();
	const token = cookieStore.get("auth_token");
	let isLoggedIn = false;

	if (token) {
		isLoggedIn = await verifyToken(token.value);
	}

	return (
		<>
			{isLoggedIn ? (
				<Suspense fallback={<div>Loading...</div>}>
					<FetchArchivePosts />
				</Suspense>
			) : (
				<Login />
			)}
		</>
	);
}

async function FetchArchivePosts() {
	const postData = await fetchArchivePosts({});
	return <PoemManager posts={postData} />;
}
