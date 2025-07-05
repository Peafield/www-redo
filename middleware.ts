import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const JWT_SECRET = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value;

	if (!token) {
		return NextResponse.redirect(new URL("/admin", req.url));
	}

	try {
		jwt.verify(token, JWT_SECRET);
		return NextResponse.next();
	} catch (err) {
		if (process.env.NODE_ENV === "development") {
			console.error(err);
		}
		return NextResponse.redirect(new URL("/admin", req.url));
	}
}

export const config = {
	matcher: ["/admin/dashboard"],
};
