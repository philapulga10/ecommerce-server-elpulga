import express from "express";

import {
  addCategory,
  addProductImage,
  createProduct,
  deleteCategory,
  deleteProduct,
  deleteProductImage,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from "../controllers/product.js";
import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/all", getAllProducts);

router.get("/admin", isAuthenticated, isAdmin, getAdminProducts);

router.get("/single/:id", getProductDetails);

router.post("/new", isAuthenticated, isAdmin, singleUpload, createProduct);

router.put("/single/:id", isAuthenticated, isAdmin, updateProduct);

router.delete("/single/:id", isAuthenticated, isAdmin, deleteProduct);

router.post(
  "/images/:id",
  isAuthenticated,
  isAdmin,
  singleUpload,
  addProductImage
);

router.delete("/images/:id", isAuthenticated, isAdmin, deleteProductImage);

router.post("/category", isAuthenticated, isAdmin, addCategory);

router.get("/categories", getAllCategories);

router.delete("/category/:id", isAuthenticated, isAdmin, deleteCategory);

export default router;
