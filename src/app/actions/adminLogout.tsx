"use server";

import { cookies } from "next/headers";

export default async function adminLogout() {
	try {
		(await cookies()).set("name", "value", { maxAge: 0 });
	} catch (error) {
		console.error("Error logging out admin:", error);
	}
}
