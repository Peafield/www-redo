import { adminGetPoemByIdToEdit } from "@/app/actions/adminGetPoemByIdToEdit";
import PoemEditor from "@/components/admin/poem/editor/PoemEditor";

type NewPoemPageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function NewPoemPage({ searchParams }: NewPoemPageProps) {
	const id = (await searchParams).id as string;

	if (id) {
		return <GetPoemToEdit id={id} />;
	}

	return <PoemEditor initialPost={null} />;
}

async function GetPoemToEdit({ id }: { id: string }) {
	const poemToEdit = await adminGetPoemByIdToEdit(id);
	return <PoemEditor initialPost={poemToEdit} />;
}
