import express from "express";

import {
  addProductImage,
  createProduct,
  deleteProduct,
  deleteProductImage,
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

router.delete("/images/:id", isAuthenticated, deleteProductImage);

router.delete("/single/:id", isAuthenticated, deleteProduct);

export default router;
