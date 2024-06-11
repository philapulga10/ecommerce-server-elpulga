import jwt from "jsonwebtoken";

import ErrorHandler from "../utils/error.js";
import { User } from "../models/user.js";

export const isAuthenticated = async (req, _, next) => {
  const { token } = req.cookies;

  console.log(token);

  if (!token) {
    return next(new ErrorHandler("Not logged in", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData._id);

  next();
};
