import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import Stripe from "stripe";

import { errorMiddleware } from "./middlewares/error.js";
import connectDB from "./config/db.js";
import user from "./routes/user.js";
import product from "./routes/product.js";
import order from "./routes/order.js";

config({
  path: "./data/config.env",
});

connectDB();

export const app = express();

export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", user);
app.use("/api/v1/product", product);
app.use("/api/v1/order", order);

app.use(errorMiddleware);
