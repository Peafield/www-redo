type AdminLoginActionResult = {
	success: boolean;
	message?: string;
	error?: string;
};

export default async function adminLogin(
	_prevState: AdminLoginActionResult | null,
	formData: FormData,
): Promise<AdminLoginActionResult> {
	const username = formData.get("username");
	const password = formData.get("password");
	try {
		const response = await fetch("/api/auth", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			return { success: false, message: "Invalid username or password" };
		}
		return { success: true };
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error logging in admin:", error);
		}
		return {
			success: false,
			message: "Error logging in admin",
			error: `Error logging in admin: ${error}`,
		};
	}
}
