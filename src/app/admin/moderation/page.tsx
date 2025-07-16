import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getPendingComments } from "@/app/actions/getPendingComments";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export default function AdminModerationPage() {
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

	return <AdminDashboard pendingComments={pendingComments} />;
}
