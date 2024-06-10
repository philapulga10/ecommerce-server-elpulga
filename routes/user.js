import express from "express";
import { login, signUp } from "../controllers/user.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", signUp);

export default router;
