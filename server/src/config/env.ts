import dotenv from "dotenv";

if (process.env.NODE_ENV === "testing") {
	// get .env.test file
	dotenv.config({ path: ".env.test" });
} else if (process.env.NODE_ENV === "development") {
	// get .env.development file
	dotenv.config({ path: ".env.dev" });
} else {
	// get .env file
	dotenv.config();
}

const NODE_ENV = process.env.NODE_ENV || "production";
const PORT = process.env.PORT || "3000";
const DB_URI: string = process.env.DB_URI as string;
const BUCKET_NAME: string = process.env.BUCKET_NAME as string;
const BUCKET_S3_URI: string = process.env.BUCKET_URI as string;
const BUCKET_S3_KEY: string = process.env.BUCKET_KEY as string;
const BUCKET_S3_SECRET: string = process.env.BUCKET_SECRET as string;
const BUCKET_GCP_ID: string = process.env.BUCKET_ID as string;
const BUCKET_GCP_KEY_PATH: string = process.env.BUCKET_KEY_PATH as string;
const ALLOWED_ORIGINS: string = process.env.ALLOWED_ORIGINS as string;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

export {
	NODE_ENV,
	PORT,
	DB_URI,
	BUCKET_NAME,
	BUCKET_S3_URI,
	BUCKET_S3_KEY,
	BUCKET_S3_SECRET,
	BUCKET_GCP_ID,
	BUCKET_GCP_KEY_PATH,
	JWT_SECRET,
	ALLOWED_ORIGINS
};
