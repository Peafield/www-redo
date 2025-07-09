import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPoemById } from "@/app/actions/getPoemById";
import BottomNav from "@/components/navigation/BottomNav";
import Poem from "@/components/poem/Poem";
import PoemSkeleton from "@/components/skeletons/PoemSkeleton";

type GetPoemProps = {
	params: {
		id: string;
	};
};

export default async function PoemPage({ params }: GetPoemProps) {
	const { id } = await params;

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

	return (
		<>
			<Poem poem={poem} />
			<BottomNav />
		</>
	);
}
