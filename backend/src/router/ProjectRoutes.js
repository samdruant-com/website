import express from "express";
import ProjectMiddleware from "../middleware/ProjectMiddleware.js";

const Router = express.Router();

// get single project
Router.get("/:id", ProjectMiddleware.GetProject);
// get all projects
Router.get("/", ProjectMiddleware.IndexProjects);

export default Router;
