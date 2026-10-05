import express from "express";
import {
    createTransaction,
    deleteTransaction,
    getTransactions,
    monthlySummary,
    updateTransactions,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validateZod.js";
import {
    createTransactionSchema,
    updateTransactionSchema,
} from "../schemas/transaction.js";

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /transactions/monthly-summary:
 *   get:
 *     tags: [Transactions]
 *     summary: Totals per category for one month
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           example: "2026-10"
 *         description: Month in YYYY-MM format
 *     responses:
 *       200:
 *         description: Income, expense, balance and totals by category
 *       400:
 *         description: Invalid or missing month
 *       401:
 *         description: Not logged in
 */
router.get("/monthly-summary", monthlySummary);

/**
 * @swagger
 * /transactions:
 *   post:
 *     tags: [Transactions]
 *     summary: Add a new income or expense
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, amount, type, category]
 *             properties:
 *               title:
 *                 type: string
 *                 example: Groceries
 *               amount:
 *                 type: number
 *                 description: Always positive. The type sets the direction.
 *                 example: 50
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               category:
 *                 type: string
 *                 description: Must match the type (see GET /categories)
 *                 example: Food
 *               date:
 *                 type: string
 *                 format: date
 *                 example: "2026-10-02"
 *     responses:
 *       201:
 *         description: Transaction created
 *       400:
 *         description: Validation error, unknown category, or category does not match the type
 *       401:
 *         description: Not logged in
 */
router.post("/", validate(createTransactionSchema), createTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     tags: [Transactions]
 *     summary: List my transactions, newest first
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of the logged-in user's transactions
 *       401:
 *         description: Not logged in
 */
router.get("/", getTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     tags: [Transactions]
 *     summary: Edit one of my transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               amount:
 *                 type: number
 *                 example: 65
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Updated transaction
 *       400:
 *         description: Validation error, bad ID, or category does not match the type
 *       401:
 *         description: Not logged in
 *       404:
 *         description: Transaction not found
 */
router.put("/:id", validate(updateTransactionSchema), updateTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     tags: [Transactions]
 *     summary: Delete one of my transactions
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction deleted
 *       400:
 *         description: Invalid ID
 *       401:
 *         description: Not logged in
 *       404:
 *         description: Transaction not found
 */
router.delete("/:id", deleteTransaction);

export default router;