import Category from "../models/category.js";
export const getCategory = async (req, res, next) => {
    try {
        const category = await Category.find();
        if (!category) return res.status(404).json({ message: "category not found" })
        res.json(category)
    } catch (error) {
        next(error)
    }
}
