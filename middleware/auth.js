import jwt from "jsonwebtoken";
import User from "../models/auth.js";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode.id).select("-password");
    console.log(req.user)

    next();
    
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired Token" });
  }
};
