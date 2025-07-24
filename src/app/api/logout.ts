import { NextResponse } from "next/server";
import { env } from "@/env";

export async function GET() {
	const response = NextResponse.json({ success: true });
	response.cookies.set("auth_token", "", {
		httpOnly: true,
		secure: env.NODE_ENV === "production",
		sameSite: "strict",
		expires: new Date(0),
	});

	return response;
}
