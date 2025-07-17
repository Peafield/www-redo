import { jwtVerify } from "jose";
import { type NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(req: NextRequest) {
	if (!JWT_SECRET) {
		return new NextResponse("Internal Server Error", { status: 500 });
	}

	const token = req.cookies.get("auth_token")?.value;

	if (!token) {
		return NextResponse.redirect(new URL("/admin", req.url));
	}

	try {
		const secretKey = new TextEncoder().encode(JWT_SECRET);
		await jwtVerify(token, secretKey);
		return NextResponse.next();
	} catch (err) {
		console.log("Verification failed. Redirecting to /admin.", err);
		return NextResponse.redirect(new URL("/admin", req.url));
	}
}

export const config = {
	matcher: ["/admin/new-poem", "/admin/moderation"],
};
