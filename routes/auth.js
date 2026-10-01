import express from "express";
import {login, register } from "../controllers/auth.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validateZod.js"
import { createUserSchema, loginSchema } from "../schemas/authSchema.js";
const router = express.Router();
router.post("/register", validate(createUserSchema), register);
router.post("/login",validate(loginSchema),login)
router.post("/profile", protect,(req, res)=> {
    res.json(`welcome protected profile ${req.user.name}`);
})

export default router;
