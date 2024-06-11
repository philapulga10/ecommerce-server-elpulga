import express from "express";

import { getMyProfile, logOut, login, signUp } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", signUp);

router.get("/logout", isAuthenticated, logOut);

router.get("/me", isAuthenticated, getMyProfile);

export default router;
