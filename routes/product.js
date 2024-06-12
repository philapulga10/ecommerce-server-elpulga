import express from "express";

import {
  createProduct,
  getAllProducts,
  getProductDetails,
} from "../controllers/product.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.get("/single/:productId", getProductDetails);

router.post("/new", isAuthenticated, singleUpload, createProduct);

export default router;
