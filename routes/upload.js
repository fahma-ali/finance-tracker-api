import express from "express";
import { uploadProfilePicture } from "../controllers/uploadController.js";
import { upload } from "../middleware/upload.js";
import {protect} from "../middleware/auth.js"
const router = express.Router();
router.post("/profile-picture", protect, upload.single("picture"), uploadProfilePicture)

export default router;