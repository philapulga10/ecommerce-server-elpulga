import express from "express";

import {
  addCategory,
  addProductImage,
  createProduct,
  deleteCategory,
  deleteProduct,
  deleteProductImage,
  getAllCategories,
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

router.post("/category", isAuthenticated, addCategory);

router.get("/categories", getAllCategories);

router.delete("/category/:id", isAuthenticated, deleteCategory);

export default router;
