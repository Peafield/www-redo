"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import type { PostUpdate } from "@/types/posts";

type HeroSectionProps = {
	children: React.ReactNode;
	showImage?: boolean;
	post?: PostUpdate;
	className?: string;
};

const HeroSection = ({
	children,
	showImage = true,
	post,
	className,
}: HeroSectionProps) => {
	const imageData = useMemo(() => {
		if (post) {
			if (post.image) {
				const src = URL.createObjectURL(post.image);
				const alt = `Image for ${post.title || "New Post"}`;
				return { src, alt, needsCleanup: true };
			}
			if (post.image_url) {
				const src = post.image_url
					? `/api/image/${encodeURIComponent(post.image_url)}`
					: "/placeholder.png";
				const alt = `Image for ${post.title}`;
				return { src, alt, needsCleanup: false };
			}
		}
		return {
			src: "/placeholder.png",
			alt: "Placeholder image",
			needsCleanup: false,
		};
	}, [post]);

	useEffect(() => {
		return () => {
			if (imageData.needsCleanup) {
				URL.revokeObjectURL(imageData.src);
			}
		};
	}, [imageData]);

	return (
		<section
			className={clsx("relative mb-4 mobile:h-[32dvh] md:h-[64dvh]", className)}
		>
			{/* TODO: Add back in blurdata when you can be bothered */}
			{showImage && (
				<Image
					src={imageData.src}
					alt={imageData.alt}
					priority
					fill
					sizes="100%"
					className="object-cover"
				/>
			)}
			{children}
		</section>
	);
};

export default HeroSection;
