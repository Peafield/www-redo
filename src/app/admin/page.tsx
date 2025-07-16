import { notFound } from "next/navigation";
import { Suspense } from "react";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { getPendingComments } from "../actions/getPendingComments";

export const dynamic = "force-dynamic";

export default function Admin() {
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
