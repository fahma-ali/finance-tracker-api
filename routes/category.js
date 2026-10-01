import express from "express";
import { getCategory } from "../controllers/categoryController.js";
import { authorize } from "../middleware/authorize.js";
import { protect } from "../middleware/auth.js";
const router = express.Router();
router.get("/",protect,getCategory)
export default router