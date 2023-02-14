import express from "express";
import { upload } from "../middleware/helpers/FileHelper.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import UserMiddleware from "../middleware/UserMiddleware.js";

const Router = express.Router();

// get single user
Router.get("/", UserMiddleware.GetUser);

// patch user
Router.patch("/", AuthMiddleware.Authenticate, upload.single("file"), UserMiddleware.PatchUser);

export default Router;
