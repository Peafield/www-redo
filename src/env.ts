import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		MONGODB_URI: z.string().url(),
		MONGO_DB_NAME: z.string().min(1),
		R2_ACCOUNT_ID: z.string().min(1),
		R2_ACCESS_KEY_ID: z.string().min(1),
		R2_SECRET_ACCESS_KEY: z.string().min(1),
		R2_BUCKET_NAME: z.string().min(1),
		R2_REGION: z.string().min(1),
		JWT_SECRET: z.string().min(1),
		ADMIN_PASSWORD: z.string().min(1),
		ADMIN_USERNAME: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_APP_URL: z.string().url(),
	},
	shared: {
		NODE_ENV: z.enum(["development", "production"]).default("development"),
	},
	experimental__runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
});
