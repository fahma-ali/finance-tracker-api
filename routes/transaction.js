import express from "express";
import { createTransaction, deleteTransaction, getTransactions, monthlySummary, updateTransactions } from "../controllers/transactionController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validateZod.js"
import { createTransactionSchema, updateTransactionSchema } from "../schemas/transaction.js"
const router = express.Router();
router.post("/create", protect, validate(createTransactionSchema), createTransaction)
router.get("/", protect, getTransactions)
router.put("/update/:id", protect, validate(updateTransactionSchema), updateTransactions)
router.delete("/delete/:id", protect, deleteTransaction)
router.get("/monthly-summary",protect, monthlySummary);
export default router;