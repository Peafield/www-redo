import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPoemById } from "@/app/actions/getPoemById";
import { getPoemCommentsbyId } from "@/app/actions/getPoemCommentsById";
import Poem from "@/components/poem/Poem";
import PoemSkeleton from "@/components/skeletons/PoemSkeleton";
import type { Comment } from "@/types/posts";

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
	const poemData = await getPoemById(id);
	if (poemData) {
		const { poem } = poemData;

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
	const poemData = await getPoemById(id);
	const poemComments = await getPoemCommentsbyId(id);
	if (!poemData) {
		notFound();
	}
	const { poem, nextPoem, previousPoem } = poemData;
	return (
		<Poem
			poem={poem}
			poemComments={poemComments as Comment[]}
			previousPoem={previousPoem}
			nextPoem={nextPoem}
		/>
	);
}
