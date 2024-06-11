import express from "express";

import { getMyProfile, login, signUp } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", signUp);

router.get("/me", isAuthenticated, getMyProfile);

export default router;
