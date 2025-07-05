"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AUTO_SLIDE_INTERVAL } from "@/app/constants/constants";
import type { Post } from "@/types/posts";
import ChevronLeftIcon from "../icons/ChevronLeftIcon";
import ChevronRightIcon from "../icons/ChevronRightIcon";
import CarouselSection from "./CarouselSection";

type CarouselProps = {
	posts: Post[];
};

const Carousel = ({ posts }: CarouselProps) => {
	const router = useRouter();
	const [currentIndex, setCurrentIndex] = useState(0);
	const slidesRef = useRef<HTMLDivElement>(null);
	const endOfSlides = posts.length - 1 === currentIndex;

	const nextSlide = () => {
		setCurrentIndex((prev) => (prev + 1) % posts.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
	};

	useEffect(() => {
		const slideWidth = slidesRef.current?.children[0]?.clientWidth || 0;
		if (slidesRef.current) {
			slidesRef.current.style.transform = `translateX(-${
				currentIndex * slideWidth
			}px)`;
		}
	}, [currentIndex]);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % posts.length);
		}, AUTO_SLIDE_INTERVAL);

		// Cleanup on unmount
		return () => clearInterval(timer);
	}, [posts.length]);

	const handleClick = () => {
		router.push(`/poem/${posts[currentIndex]._id}`);
	};

	return (
		<div className="relative my-4 w-full overflow-hidden">
			{/* Slide Container */}
			{/** biome-ignore lint/a11y/useSemanticElements: this does work but needs to be changed at some point */}
			<div
				ref={slidesRef}
				onClick={handleClick}
				role="link"
				tabIndex={0}
				onKeyDown={handleClick}
				className="flex cursor-pointer transition-transform duration-500 ease-in-out"
				style={{ width: `${posts.length * 100}%` }}
			>
				{posts.map((post) => (
					<CarouselSection key={post.title} post={post} />
				))}
			</div>

			{/* Navigation */}
			{currentIndex > 0 && (
				<button
					type="button"
					className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:animate-pulse"
					onClick={prevSlide}
				>
					<ChevronLeftIcon className="mobile:size-8 md:size-16" />
				</button>
			)}
			{!endOfSlides && (
				<button
					type="button"
					className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:animate-pulse"
					onClick={nextSlide}
				>
					<ChevronRightIcon className="mobile:size-8 md:size-16" />
				</button>
			)}
		</div>
	);
};

export default Carousel;
