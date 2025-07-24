import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production"]).default("development"),
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
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		MONGODB_URI: process.env.MONGODB_URI,
		MONGO_DB_NAME: process.env.MONGO_DB_NAME,
		R2_ACCOUNT_ID: process.env.R2_ACCOUNT_ID,
		R2_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
		R2_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
		R2_BUCKET_NAME: process.env.R2_BUCKET_NAME,
		R2_REGION: process.env.R2_REGION,
		JWT_SECRET: process.env.JWT_SECRET,
		ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
		ADMIN_USERNAME: process.env.ADMIN_USERNAME,
	},
	emptyStringAsUndefined: true,
});
