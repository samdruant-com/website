import express from "express";
import AboutRoutes from "./AboutRoutes.js";
import AdminRoutes from "./AdminRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import ProjectRoutes from "./ProjectRoutes.js";
import SecretRoutes from "./SecretRoutes.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

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
	{ path: "/about", hanlder: AboutRoutes },
	{ path: "/projects", hanlder: ProjectRoutes },
	{ path: "/admins", hanlder: AdminRoutes, protected: true },
	{ path: "/secrets", hanlder: SecretRoutes, protected: true },
];

// apply routes to app
routes.forEach((route) => {
	// authentificate routes if protected
	if (route.protected) {
		router.use("/api" + route.path, AuthMiddleware.Authenticate, route.hanlder);
	} else {
		router.use("/api" + route.path, route.hanlder);
	}
});

// define wildcard route
router.all("*", (req, res) => {
	return res
		.status(404)
		.send(`[${req.method}] ${req.originalUrl} does not exists`);
});

export default router;
