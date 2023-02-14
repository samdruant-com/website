import express from "express";
import UserRoutes from "./UserRoutes.js";
import AdminRoutes from "./AdminRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import WorkRoutes from "./WorkRoutes.js";

const router = express.Router();

// define base
router.get("/", (req, res) => {
	return res.status(200).send("Hello World!");
});

// define base
router.get("/api", (req, res) => {
	return res.status(200).send("Welcome to Sam Druant's API");
});

// define routes
const routes = [
	{ path: "/auth", hanlder: AuthRoutes },
	{ path: "/users", hanlder: UserRoutes },
	{ path: "/works", hanlder: WorkRoutes },
	{ path: "/admins", hanlder: AdminRoutes }
];

// apply routes to app
routes.forEach((route) => {
	router.use("/api" + route.path, route.hanlder);
});

// define wildcard route
router.all("*", (req, res) => {
	return res
		.status(404)
		.send(`[${req.method}] ${req.originalUrl} does not exists`);
});

export default router;
