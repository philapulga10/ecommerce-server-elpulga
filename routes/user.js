import express from "express";

import {
  changePassword,
  forgetPassword,
  getMyProfile,
  logOut,
  login,
  resetPassword,
  signUp,
  updatePic,
  updateProfile,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", singleUpload, signUp);

router.get("/logout", isAuthenticated, logOut);

router.get("/me", isAuthenticated, getMyProfile);

router.put("/update-profile", isAuthenticated, updateProfile);

router.put("/change-password", isAuthenticated, changePassword);

router.put("/update-pic", isAuthenticated, singleUpload, updatePic);

router.post("/forget-password", forgetPassword);

router.put("/forget-password", resetPassword);

export default router;
