import jwt from "jsonwebtoken";

import ErrorHandler from "../utils/error.js";
import { User } from "../models/user.js";
import { asyncError } from "./error.js";

export const isAuthenticated = async (req, _, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Not logged in", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData._id);

  next();
};

export const isAdmin = asyncError(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admin allowed", 401));
  }

  next();
});
