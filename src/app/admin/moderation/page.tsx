import { notFound } from "next/navigation";
import { getPendingComments } from "@/app/actions/getPendingComments";
import CommentModeration from "@/components/admin/moderation/CommentModeration";

export const dynamic = "force-dynamic";

export default function AdminCommentModerationPage() {
	return <GetPendingComments />;
}

async function GetPendingComments() {
	const pendingComments = await getPendingComments();
	if (!pendingComments) {
		notFound();
	}

	return <CommentModeration pendingComments={pendingComments} />;
}
