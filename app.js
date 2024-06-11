import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import { errorMiddleware } from "./middlewares/error.js";
import connectDB from "./config/db.js";
import user from "./routes/user.js";

config({
  path: "./data/config.env",
});

connectDB();

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", user);

app.use(errorMiddleware);
