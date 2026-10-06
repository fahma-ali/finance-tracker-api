// middleware/upload.js
import multer from "multer";

const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        return cb(null, true);
    }
    const error = new Error("Only JPG, PNG or WEBP images are allowed");
    error.statusCode = 400;
    cb(error);
};

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
    fileFilter,
});