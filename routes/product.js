import express from "express";

import { getProductDetails } from "../controllers/product.js";

const router = express.Router();

router.get("/all");

router.get("/single/:productId", getProductDetails);

export default router;
