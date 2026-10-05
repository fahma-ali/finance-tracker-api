import express from "express";
import { login, register } from "../controllers/auth.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validateZod.js";
import { createUserSchema, loginSchema } from "../schemas/authSchema.js";

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Create a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Fahma
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: Min 8 characters, with upper, lower, number and special character
 *                 example: Abcdefg1!
 *     responses:
 *       201:
 *         description: Account created, returns a token
 *       400:
 *         description: Validation error or email already used
 *       429:
 *         description: Too many attempts
 */
router.post("/register", validate(createUserSchema), register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Log in and get a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: Abcdefg1!
 *     responses:
 *       200:
 *         description: Returns a JWT token
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid email or password
 *       429:
 *         description: Too many login attempts
 */
router.post("/login", validate(loginSchema), login);

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     tags: [Auth]
 *     summary: Get the logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The current user
 *       401:
 *         description: Not logged in
 */
router.get("/profile", protect, (req, res) => {
    res.json(req.user);
});

export default router;