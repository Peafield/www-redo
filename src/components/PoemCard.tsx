"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IoWarning } from "react-icons/io5";
import { deletePost } from "@/app/actions";
import type { Post } from "@/types/posts";
import { useUserStore } from "../../store/userStore";

type PoemCardProps = {
	post: Post;
};

const PoemCard = ({ post }: PoemCardProps) => {
	const router = useRouter();
	const {
		user: { isLoggedIn },
	} = useUserStore();

	const handleEdit = () => {
		router.push(`/admin/dashboard/${post._id}`);
	};

	// TODO: Add function to remove image from cloudflare
	const handleDelete = async () => {
		try {
			await deletePost(post._id.toString());
			toast.success("Post deleted successfully");
			router.refresh();
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to delete post",
			);
		}
	};

	const renderDeleteToast = async () => {
		return toast(
			(t) => (
				<div className="flex flex-col items-center gap-6 p-4">
					<div className="flex flex-col items-center gap-4 text-center">
						<IoWarning className="size-16 animate-pulse text-red-500" />
						<h1 className="font-lato text-xl font-semibold text-gray-900">
							Are you sure you want to delete this poem?
						</h1>
					</div>

					<div className="flex w-full gap-4">
						<button
							onClick={() => {
								toast.dismiss(t.id);
								handleDelete();
							}}
							className="flex-1 rounded-lg bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-red-600 hover:shadow-lg"
						>
							Delete
						</button>
						<button
							onClick={() => toast.dismiss(t.id)}
							className="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-gray-900 shadow-md transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:bg-secondary hover:shadow-lg"
						>
							Keep
						</button>
					</div>
				</div>
			),
			{
				duration: 30000,
			},
		);
	};

	const src = post.image_url
		? `/api/image/${encodeURIComponent(post.image_url)}`
		: "/placeholder.png";

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={() => router.push(`/poem/${post._id}`)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					router.push(`/poem/${post._id}`);
				}
			}}
			className="group relative flex h-[400px] w-80 cursor-pointer flex-col overflow-hidden rounded-2xl bg-stone-100 shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
		>
			<div className="relative h-1/2 w-full">
				{/* TODO: Add back in placeholder blur when you can be bothered */}
				<Image
					src={src}
					alt={`Image for ${post.title}`}
					fill
					sizes="100%"
					className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
				/>
				{isLoggedIn && (
					<div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-100 transition-opacity duration-300 ease-in-out md:opacity-0 md:group-hover:opacity-100">
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleEdit();
							}}
							className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-gray-900 transition duration-200 ease-in-out hover:bg-secondary"
						>
							Edit
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								renderDeleteToast();
							}}
							className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-gray-900 transition duration-200 ease-in-out hover:bg-secondary"
						>
							Delete
						</button>
					</div>
				)}
			</div>

			<div className="flex h-1/2 flex-col gap-4 p-6 ">
				<h2 className="font-playfair_display text-2xl font-bold tracking-tight text-gray-900">
					{post.title}
				</h2>
				<p className="line-clamp-3 text-gray-800">{post.preview_text}</p>
				<div className="mt-auto flex items-center justify-between">
					<span className="text-sm font-medium text-gray-800">
						{new Date(post.date).toLocaleDateString()}
					</span>
					<button
						className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-gray-900 transition-all duration-200 ease-in-out hover:bg-secondary"
						onClick={(e) => {
							e.stopPropagation();
							router.push(`/poem/${post._id}`);
						}}
					>
						Read More
					</button>
				</div>
			</div>
		</div>
	);
};

export default PoemCard;
