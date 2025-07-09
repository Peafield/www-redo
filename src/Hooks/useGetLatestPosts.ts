"use client";

import { useCallback, useEffect, useState } from "react";
import type { fetchLatestPostsReponse } from "@/types/posts";

export default function useGetLatestPosts() {
	const [postData, setPostData] = useState<fetchLatestPostsReponse | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const fetchPosts = useCallback(async () => {
		setError(null);
		try {
			const postsResponse = await fetch(
				`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`,
				{
					method: "GET",
					cache: "no-store",
					next: { revalidate: 0 },
				},
			);
			if (!postsResponse.ok) {
				const errorData = await postsResponse
					.json()
					.catch(() => ({ message: "Network response was not ok" }));
				throw new Error(
					errorData.message || `HTTP error! status: ${postsResponse.status}`,
				);
			}
			setPostData(await postsResponse.json());
		} catch (err) {
			console.error("Error in useGetPosts (fetchPosts):", err);
			setError(err as Error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		setLoading(true);
		fetchPosts();
	}, [fetchPosts]);

	return { postData, loading, error, fetchPosts };
}
