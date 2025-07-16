import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPendingComments } from "@/app/actions/getPendingComments";
import CommentModeration from "@/components/admin/moderation/CommentModeration";

export const dynamic = "force-dynamic";

export default function AdminCommentModerationPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<GetAdminData />
		</Suspense>
	);
}

async function GetAdminData() {
	const pendingComments = await getPendingComments();
	if (!pendingComments) {
		notFound();
	}

	return <CommentModeration pendingComments={pendingComments} />;
}
