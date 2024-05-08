import dotenv from "dotenv";

// load environment specific .env files
if (process.env.NODE_ENV === "test") {
	dotenv.config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
	dotenv.config({ path: ".env.dev" });
} else {
	dotenv.config();
}

const NODE_ENV = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || "5000";
const DB_URI: string = process.env.DB_URI as string;
const BUCKET_NAME: string = process.env.BUCKET_NAME as string;
const BUCKET_S3_URI: string = process.env.BUCKET_S3_URI as string;
const BUCKET_S3_KEY: string = process.env.BUCKET_S3_KEY as string;
const BUCKET_S3_SECRET: string = process.env.BUCKET_S3_SECRET as string;
const BUCKET_S3_REGION: string = process.env.BUCKET_S3_REGION as string;
const ALLOWED_ORIGINS: string = process.env.ALLOWED_ORIGINS as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;
const ADMIN_SECRET: string = process.env.ADMIN_SECRET as string;

export {
	NODE_ENV,
	PORT,
	DB_URI,
	BUCKET_NAME,
	BUCKET_S3_URI,
	BUCKET_S3_KEY,
	BUCKET_S3_SECRET,
	BUCKET_S3_REGION,
	JWT_SECRET,
	ALLOWED_ORIGINS,
	ADMIN_SECRET
};
