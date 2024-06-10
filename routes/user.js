import express from "express";
import { login, signUp } from "../controllers/user.js";

const router = express.Router();

router.post("/login").get(login);

router.post("/register").get(signUp);

export default router;
