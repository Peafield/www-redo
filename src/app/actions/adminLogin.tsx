"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";

type AdminLoginActionResult = {
	success: boolean;
	message?: string;
};

export default async function adminLogin(
	_prevState: AdminLoginActionResult | null,
	formData: FormData,
): Promise<AdminLoginActionResult> {
	const username = formData.get("username") as string;
	const password = formData.get("password") as string;

	const JWT_SECRET = process.env.JWT_SECRET;
	const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
	const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

	if (!JWT_SECRET || !ADMIN_USERNAME || !ADMIN_PASSWORD) {
		console.error(
			"Server configuration error: Missing admin credentials or JWT secret",
		);
		return {
			success: false,
			message: "Server configuration error. Please contact the administrator.",
		};
	}

	if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
		try {
			const secretKey = new TextEncoder().encode(JWT_SECRET);
			const token = await new SignJWT({ username })
				.setProtectedHeader({ alg: "HS256" })
				.setIssuedAt()
				.setExpirationTime("1h")
				.sign(secretKey);
			const cookieStore = await cookies();
			cookieStore.set("auth_token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "strict",
				path: "/",
				maxAge: 3600, // 1 hour in seconds
			});

			return { success: true, message: "Login successful!" };
		} catch (error) {
			console.error("Error signing JWT:", error);
			return { success: false, message: "Could not create session." };
		}
	}

	// 5. If authentication fails, return a clear message
	return { success: false, message: "Invalid username or password" };
}
