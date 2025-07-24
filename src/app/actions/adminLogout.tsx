"use server";

export default async function adminLogout() {
	try {
		await fetch("/api/auth/logout", {
			method: "GET",
		});
	} catch (error) {
		console.error("Error logging out admin:", error);
	}
}
