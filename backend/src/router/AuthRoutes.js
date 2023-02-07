import express from "express";
import AuthMiddleware from "../middleware/AuthMiddleware.js";
import AdminMiddleware from "../middleware/AdminMiddleware.js";

const Router = express.Router();

// login
Router.post("/login", AuthMiddleware.Login);
// register
Router.post("/register", AdminMiddleware.PostAdmin);
// refresh access tokens
Router.post("/tokens", AuthMiddleware.Refresh);

export default Router;
