import express from "express";
import AboutMiddleware from "../middleware/AboutMiddleware.js";
import ProjectMiddleware from "../middleware/ProjectMiddleware.js";
import { upload } from "../middleware/helpers/FileHelper.js";

const Router = express.Router();

// patch about
Router.patch("/about", upload.single("file"), AboutMiddleware.PatchAbout);

// post project
Router.post("/projects", upload.array("files"), ProjectMiddleware.PostProject);
// get single project
Router.get("/projects/:id", ProjectMiddleware.GetSecretProject);
// get all projects
Router.get("/projects", ProjectMiddleware.IndexSecretProjects);
// patch project
Router.patch("/projects/:id", upload.array("files"), ProjectMiddleware.PatchProject);

export default Router;
