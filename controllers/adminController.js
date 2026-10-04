import User from "../models/auth.js";
import Transaction from "../models/transaction.js";

export const overview = async (req, res, next) => {
    try {
        // run 4 queries at the same time
        const [totalUsers, totalTransactions, byType, topRows] = await Promise.all([
            User.countDocuments(),
            Transaction.countDocuments(),

            // income and expense totals, all users
            Transaction.aggregate([
                { $group: { _id: "$type", total: { $sum: "$amount" } } },
            ]),

            // top 5 spending categories, all users
            Transaction.aggregate([
                { $match: { type: "expense" } },
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: "$amount" },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { total: -1 } },
                { $limit: 5 },
            ]),
        ]);

        // find the total for one type, or 0 if there is none
        const totalOf = (type) => byType.find((r) => r._id === type)?.total ?? 0;

        const topSpendingCategories = topRows.map((r) => ({
            category: r._id,
            total: r.total,
            count: r.count,
        }));

        res.json({
            totalUsers,
            totalTransactions,
            totalIncome: totalOf("income"),
            totalExpense: totalOf("expense"),
            topSpendingCategories,
        });
    } catch (error) {
        next(error);
    }
};