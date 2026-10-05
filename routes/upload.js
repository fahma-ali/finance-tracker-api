import express from "express";
import { uploadProfilePicture } from "../controllers/uploadController.js";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

/**
 * @swagger
 * /upload/profile-picture:
 *   post:
 *     tags: [Upload]
 *     summary: Upload or replace my profile picture
 *     description: JPG, PNG or WEBP, max 2 MB. Uploading the same image again does nothing.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [picture]
 *             properties:
 *               picture:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Picture saved, or the same image was already saved. Returns the Cloudinary URL.
 *         content:
 *           application/json:
 *             example:
 *               message: Profile picture updated
 *               profilePicture: https://res.cloudinary.com/.../user_123.png
 *       400:
 *         description: No file, wrong file type, or file larger than 2 MB
 *       401:
 *         description: Not logged in
 */
router.post(
    "/profile-picture",
    protect,
    upload.single("picture"),
    uploadProfilePicture
);

export default router;