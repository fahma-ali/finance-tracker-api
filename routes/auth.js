import express from "express";
import {login, register } from "../controllers/auth.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();
router.post("/register", register);
router.post("/login",login)
router.post("/profile", protect,(req, res)=> {
    res.json(`welcome protected profile ${req.user.name}`);
})

export default router;
