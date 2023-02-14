import express from "express";
import AdminMiddleware from "../middleware/AdminMiddleware.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const Router = express.Router();

// get single admin
Router.get("/:id", AdminMiddleware.GetAdmin);
// patch admin
Router.patch("/:id", AuthMiddleware.Authenticate, AdminMiddleware.PatchAdmin);

export default Router;
