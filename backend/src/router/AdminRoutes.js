import express from "express";
import AdminMiddleware from "../middleware/AdminMiddleware.js";

const Router = express.Router();

// get single admin
Router.get("/:id", AdminMiddleware.GetAdmin);
// patch admin
Router.patch("/:id", AdminMiddleware.PatchAdmin);

export default Router;
