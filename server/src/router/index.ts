import { Router, json } from "express";
import { routes as authRoutes } from "./auth";
import { routes as userRoutes } from "./user";
import { routes as workRoutes } from "./work";
import { routes as projectRoutes } from "./project";
import { verifyAccessToken } from "../middleware/auth";
import { parseFile } from "./helpers/parser";
import type { Route } from "./helpers/types";

const BASE_PATH = "/api";

const router = Router();
const routes: Route[] = [...authRoutes, ...userRoutes, ...workRoutes, ...projectRoutes];

routes.forEach((route) => {
	const preMiddleware = [];

	/**
   * Parse request body as JSON if the route is not marked as notJson
   */
	if(route.json !== false) {
		preMiddleware.push(json());
	}

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
		preMiddleware.push(parseFile(route.upload.field, route.upload.multiple, { maxCount: route.upload.maxCount } ));
	}

	const isArray = Array.isArray(route.handler);
	const path = `${BASE_PATH}${route.path}`;
	router[route.method](path, ...preMiddleware, isArray ? [...route.handler] : route.handler);
});

router.get("/*", (req, res) => {
	return res.status(400).send(`[*] the resource '${req.url}' does not exists`);
});

export { router };