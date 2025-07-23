import { Suspense } from "react";
import { adminGetPoemByIdToEdit } from "@/app/actions/adminGetPoemByIdToEdit";
import PoemEditor from "@/components/admin/poem/editor/PoemEditor";

type NewPoemPageProps = {
	searchParams: { [key: string]: string | undefined };
};

export default async function NewPoemPage({ searchParams }: NewPoemPageProps) {
	const id = (await searchParams).id;

	if (id) {
		return (
			<Suspense fallback={<p>Loading poem...</p>}>
				<GetPoemToEdit id={id} />
			</Suspense>
		);
	}

	return <PoemEditor initialPost={null} />;
}

async function GetPoemToEdit({ id }: { id: string }) {
	const poemToEdit = await adminGetPoemByIdToEdit(id);
	return <PoemEditor initialPost={poemToEdit} />;
}
