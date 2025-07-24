"use server";

export default async function adminLogout() {
	try {
		await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/logout`, {
			method: "GET",
		});
	} catch (error) {
		console.error("Error logging out admin:", error);
	}
}
