import express from "express";

import {
  addProductImage,
  createProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/product.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.get("/single/:id", getProductDetails);

router.post("/new", isAuthenticated, singleUpload, createProduct);

router.put("/single/:id", isAuthenticated, updateProduct);

router.post("/images/:id", isAuthenticated, singleUpload, addProductImage);

export default router;
