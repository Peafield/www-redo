import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPoemById } from "@/app/actions/getPoemById";
import BottomNav from "@/components/navigation/BottomNav";
import Poem from "@/components/poem/Poem";
import PoemSkeleton from "@/components/skeletons/PoemSkeleton";
import type { Post } from "@/types/posts";

export const dynamic = "force-dynamic";

type GetPoemProps = {
	params: Promise<{ id: string }>;
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> {
	const id = (await params).id;
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_APP_URL}/api/poem/${id}`,
	);
	if (response.ok) {
		const poem: Post = await response.json();

		return {
			openGraph: {
				title: `Read my new poem: ${poem.title}`,
				description: poem.preview_text,
				url: `${process.env.NEXT_PUBLIC_APP_URL}/poem/${poem._id}`,
				type: "article",
				siteName: `Wendi's Worminghall Whimsies`,
			},
		};
	}
	return {};
}

export default async function PoemPage({ params }: GetPoemProps) {
	const id = (await params).id;

	return (
		<Suspense fallback={<PoemSkeleton />}>
			<GetPoem id={id} />
		</Suspense>
	);
}

async function GetPoem({ id }: { id: string }) {
	const poem = await getPoemById(id);
	if (!poem) {
		notFound();
	}

	return <Poem poem={poem} />;
}
