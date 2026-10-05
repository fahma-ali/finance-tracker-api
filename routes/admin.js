import express from "express";
import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";
import { overview } from "../controllers/adminController.js";

const router = express.Router();

/**
 * @swagger
 * /admin/overview:
 *   get:
 *     tags: [Admin]
 *     summary: Platform overview (admin only)
 *     description: Totals across all users, plus the top 5 spending categories.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Overview data
 *         content:
 *           application/json:
 *             example:
 *               totalUsers: 5
 *               totalTransactions: 42
 *               totalIncome: 6000
 *               totalExpense: 1800
 *               topSpendingCategories:
 *                 - category: Food
 *                   total: 700
 *                   count: 12
 *       401:
 *         description: Not logged in
 *       403:
 *         description: Not an admin
 */
router.get("/overview", protect, authorize("admin"), overview);

export default router;