import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { env } from "@/env";

const JWT_SECRET = env.JWT_SECRET;

export async function POST(req: Request) {
	const { username, password } = await req.json();

	if (!JWT_SECRET || !env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
		return NextResponse.json(
			{ success: false, message: "Server configuration error" },
			{ status: 500 },
		);
	}

	if (username === env.ADMIN_USERNAME && password === env.ADMIN_PASSWORD) {
		const secretKey = new TextEncoder().encode(JWT_SECRET);

		const token = await new SignJWT({ username })
			.setProtectedHeader({ alg: "HS256" })
			.setIssuedAt()
			.setExpirationTime("1h")
			.sign(secretKey);

		const response = NextResponse.json({ success: true });
		response.cookies.set("auth_token", token, {
			httpOnly: true,
			secure: env.NODE_ENV === "production",
			sameSite: "strict",
			path: "/",
			maxAge: 3600,
		});

		return response;
	}

	return NextResponse.json(
		{ success: false, message: "Invalid credentials" },
		{ status: 401 },
	);
}
