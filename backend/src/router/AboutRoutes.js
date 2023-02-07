import express from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import AboutMiddleware from "../middleware/AboutMiddleware.js";
import { upload } from "../middleware/helpers/FileHelper.js";

const Router = express.Router();

// patch about
Router.patch("/", AuthMiddleware.Authenticate, upload.single("file"), AboutMiddleware.PatchAbout);

// get single about
Router.get("/", AboutMiddleware.GetAbout);

export default Router;
