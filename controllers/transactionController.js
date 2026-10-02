// src/controllers/transactionController.js
import Transaction from "../models/transaction.js";
import Category from "../models/category.js";

export const createTransaction = async (req, res, next) => {
    const { title, amount, type, category, date } = req.body;
    try {
    
        // 1. the category must exist
        const existCategory = await Category.findOne({ name: category });
        if (!existCategory) {
            return res.status(400).json({ message: "Category does not exist" });
        }

        // 2. the category type must match the transaction type
        if (existCategory.type !== type) {
            return res
                .status(400)
                .json({ message: `Category "${category}" is for ${existCategory.type}` });
        }

        // 3. save it for the logged-in user
        const transaction = await Transaction.create({
            title,
            amount,
            type,
            category,
            date,
            user: req.user._id,
        });

        res.status(201).json(transaction);
    } catch (error) {
        next(error);
    }
};

export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ user: req.user._id }).sort({
            date: -1,
        });
        res.json(transactions);
    } catch (error) {
        next(error);
    }
};
export const updateTransactions = async (req, res, next) => {
    try {
        const { id } = req.params;

        // 1. load the current transaction (owner check included)
        const current = await Transaction.findOne({
            _id: id,
            user: req.user._id,
        });
        if (!current) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        // 2. only check when type or category is being changed
        if (req.body.type || req.body.category) {
            // use the new value if sent, otherwise keep the old one
            const type = req.body.type ?? current.type;
            const category = req.body.category ?? current.category;
            console.log(type, category)
            const found = await Category.findOne({ name: category });
            if (!found) {
                return res.status(400).json({ message: "Category does not exist" });
            }
            if (found.type !== type) {
                return res
                    .status(400)
                    .json({ message: `Category "${category}" is for ${found.type}` });
            }
        }
        const transaction = await Transaction.findOneAndUpdate(
            { _id: id, user: req.user._id },
            req.body,
            { new: true, runValidators: true }
        );

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.json(transaction);
    } catch (error) {
        next(error);
    }
};
export const deleteTransaction = async (req, res, next) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.json({ message: "Transaction deleted" });
    } catch (error) {
        next(error);
    }
};