import express from "express";
import { getCategory } from "../controllers/categoryController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /categories:
 *   get:
 *     tags: [Categories]
 *     summary: List the predefined categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of categories (name and type)
 *         content:
 *           application/json:
 *             example:
 *               - name: Food
 *                 type: expense
 *               - name: Salary
 *                 type: income
 *       401:
 *         description: Not logged in
 */
router.get("/", protect, getCategory);

export default router;