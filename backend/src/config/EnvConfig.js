import dotenv from "dotenv";
dotenv.config();

export default {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT || 3000,

	AUTH_ADMIN_SECRET: process.env.AUTH_ADMIN_SECRET,
	AUTH_JWT_SECRET: process.env.AUTH_JWT_SECRET,
	AUTH_JWT_EXPIRE: process.env.AUTH_JWT_EXPIRE || "14d",
	DO_SPACE: process.env.DO_SPACE,
	DO_SPACE_NAME: process.env.DO_SPACE_NAME,
	DO_SPACE_ACCESS_KEY: process.env.DO_SPACE_ACCESS_KEY,
	DO_SPACE_SECRET_KEY: process.env.DO_SPACE_SECRET_KEY,
	MONGO_URL: process.env.MONGO_URL,
	STATIC_URL: process.env.STATIC_URL || "http://localhost:4000",
};
