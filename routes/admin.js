import express from "express";

import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";
import { overview } from "../controllers/adminController.js";
const router = express.Router();

router.get("/overview", protect, authorize("admin"), overview);

export default router;