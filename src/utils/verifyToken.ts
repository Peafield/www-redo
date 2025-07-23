import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function verifyToken(token: string) {
	if (!JWT_SECRET) {
		console.error("JWT_SECRET is not defined in environment variables.");
		return false;
	}
	try {
		const secretKey = new TextEncoder().encode(JWT_SECRET);
		await jwtVerify(token, secretKey);
	} catch (err) {
		if (process.env.NODE_ENV === "development") console.log(err);
		return false;
	}
	return true;
}
