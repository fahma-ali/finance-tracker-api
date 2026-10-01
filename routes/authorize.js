import express from "express";
import { protect } from "../middleware/auth.js";
import { authorize } from "../middleware/authorize.js";
const router = express.Router();
router.get('/',protect,authorize('admin') ,(req, res) => {
    res.json({message:`welcome to dashboard ${req.user.name}`})
})
export default router