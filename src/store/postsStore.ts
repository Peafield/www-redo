import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Post, PostUpdate } from "@/types/posts";

interface PostsState {
	latest: Post | null;
	posts: Post[] | null;
	setLatest: (post: Post) => void;
	setPosts: (posts: Post[]) => void;
}

export const usePostsStore = create<PostsState>()(
	persist(
		(set) => ({
			latest: null,
			posts: null,
			setLatest: (post) => {
				set({
					latest: post,
				});
			},
			setPosts: (posts) => {
				set({
					posts: posts,
				});
			},
		}),
		{
			name: "posts-storage",
		},
	),
);

interface PostsCreationState {
	newPost: PostUpdate;
	setNewPost: (post: PostUpdate) => void;
	resetNewPost: () => void;
}

const initialNewPostState: PostUpdate = {
	_id: "",
	title: "",
	date: new Date().toLocaleDateString("en-GB", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}),
	content: "",
	created_at: new Date().toISOString(),
};

export const usePostsCreationStore = create<PostsCreationState>((set) => ({
	newPost: initialNewPostState,
	setNewPost: (post) => {
		set({
			newPost: post,
		});
	},
	resetNewPost: () => {
		set({
			newPost: { ...initialNewPostState, created_at: new Date().toISOString() },
		});
	},
}));
