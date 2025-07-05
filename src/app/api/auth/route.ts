import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
	const { username, password } = await req.json();

	// Validate credentials
	if (
		username === process.env.ADMIN_USERNAME &&
		password === process.env.ADMIN_PASSWORD
	) {
		// Generate JWT token
		const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

		// Set token in HTTP-only cookie
		const response = NextResponse.json({ success: true });
		response.cookies.set("auth_token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production", // Ensure secure in production
			sameSite: "strict",
			maxAge: 3600, // 1 hour
		});

		return response;
	}

	return NextResponse.json(
		{ success: false, message: "Invalid credentials" },
		{ status: 401 },
	);
}
