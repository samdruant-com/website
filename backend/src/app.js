import cors from "cors";
import express from "express";
import morgan from "morgan";
import Router from "./router/index.js";

const app = express();

// enable default CORS
app.use(cors());

// enable json body parser
app.use(express.json());

// enable morgan
app.use(morgan("dev"));

// enable router
app.use(Router);

export default app;
