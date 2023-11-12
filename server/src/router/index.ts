import { Router } from "express";
import { routes as authRoutes } from "./auth";
import { routes as userRoutes } from "./user";
import { verifyAccessToken } from "../middleware/auth";
import { upload } from "./helpers/file-upload";
import type { Route } from "./helpers/types";

const BASE_PATH = "/api";

const router = Router();
const routes: Route[] = [...authRoutes, ...userRoutes];

routes.forEach((route) => {
	const preMiddleware = [];

	/**
   * Verify access token and add authenticated user to request object. Returns 401 otherwise.
   */
	if (route.protected) {
		preMiddleware.push(verifyAccessToken);
	}

	/**
   * Look for files in the request and add them to the request object.
   */
	if(route.upload) {
		preMiddleware.push(upload(route.upload.field, route.upload.maxCount));
	}

	const path = `${BASE_PATH}${route.path}`;
	router[route.method](path, ...preMiddleware, route.handler);
});

router.get("/*", (req, res) => {
	return res.status(400).send(`[*] the resource '${req.url}' does not exists`);
});

export { router };