import { jwtVerify } from "jose";
import { env } from "@/env";

const JWT_SECRET = env.JWT_SECRET;

export default async function verifyToken(token: string) {
	if (!JWT_SECRET) {
		console.error("JWT_SECRET is not defined in environment variables.");
		return false;
	}
	try {
		const secretKey = new TextEncoder().encode(JWT_SECRET);
		await jwtVerify(token, secretKey);
	} catch (err) {
		if (env.NODE_ENV === "development") console.log(err);
		return false;
	}
	return true;
}
