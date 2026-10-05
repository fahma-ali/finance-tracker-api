import dotenv from "dotenv";
import mongoose from "mongoose";
import Category from "../models/category.js";
import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
dotenv.config();

const categories = [
    { name: "Food", type: "expense" },
    { name: "Transport", type: "expense" },
    { name: "Rent", type: "expense" },
    { name: "Bills", type: "expense" },
    { name: "Health", type: "expense" },
    { name: "Shopping", type: "expense" },
    { name: "Entertainment", type: "expense" },
    { name: "Salary", type: "income" },
    { name: "Freelance", type: "income" },
    { name: "Gift", type: "income" },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.NODE_ENV === "production" ? process.env.MONGO_URI_PRO : process.env.MONGO_URI_DEV);
        console.log("Seeding host:", mongoose.connection.host);
        console.log("Seeding database:", mongoose.connection.name);
        await Category.deleteMany();
        await Category.insertMany(categories);
        console.log("Seeded");
        process.exit();
    } catch (error) {
        console.log("Seed failed:", error);
        process.exit(1);
    }
};

seed();