import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "./env";

const JWT_SECRET = env.JWT_SECRET;

export async function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value;

	if (!token) {
		return NextResponse.redirect(new URL("/admin", req.url));
	}

	try {
		const secretKey = new TextEncoder().encode(JWT_SECRET);
		await jwtVerify(token, secretKey);
		return NextResponse.next();
	} catch (err) {
		if (env.NODE_ENV === "development") {
			console.error("Verification failed. Redirecting to /admin.", err);
		}
		return NextResponse.redirect(new URL("/admin", req.url));
	}
}

export const config = {
	matcher: ["/admin/new-poem", "/admin/moderation"],
};
