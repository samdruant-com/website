import express from "express";
import { upload } from "../middleware/helpers/FileHelper.js";
import WorkMiddleware from "../middleware/WorkMiddleware.js";
import AuthMiddleware from "../middleware/AuthMiddleware.js";

const Router = express.Router();

// get single work
Router.get("/:id", WorkMiddleware.GetWork);
// get all works
Router.get("/", WorkMiddleware.IndexWorks);

// post work
Router.post("/", AuthMiddleware.Authenticate, upload.array("files"), WorkMiddleware.PostWork);
// update work
Router.patch("/:id", AuthMiddleware.Authenticate, upload.array("files"), WorkMiddleware.PatchWork);
// delete work
Router.delete("/:id", AuthMiddleware.Authenticate, WorkMiddleware.DeleteWork);

export default Router;
