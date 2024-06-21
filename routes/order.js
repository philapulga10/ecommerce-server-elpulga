import express from "express";

import { isAdmin, isAuthenticated } from "../middlewares/auth.js";
import {
  createOrder,
  getAdminOrders,
  getMyOrders,
  getOrderDetails,
  processOrder,
} from "../controllers/order.js";

const router = express.Router();

router.post("/new", isAuthenticated, createOrder);
router.get("/my", isAuthenticated, getMyOrders);
router.get("/admin", isAuthenticated, getAdminOrders);
router.get("/single/:id", isAuthenticated, getOrderDetails);
router.put("/single/:id", isAuthenticated, isAdmin, processOrder);

export default router;
