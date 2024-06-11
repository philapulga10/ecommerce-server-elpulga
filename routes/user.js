import express from "express";

import {
  changePassword,
  getMyProfile,
  logOut,
  login,
  signUp,
  updateProfile,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", signUp);

router.get("/logout", isAuthenticated, logOut);

router.get("/me", isAuthenticated, getMyProfile);

router.put("/update-profile", isAuthenticated, updateProfile);

router.put("/change-password", isAuthenticated, changePassword);

export default router;
