import crypto from "crypto";   // built into Node, no install needed
import cloudinary from "../utils/cloudinary.js";
import User from "../models/auth.js";

const uploadToCloudinary = (buffer, userId) =>
    new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: "finance-tracker/profile",
                public_id: `user_${userId}`,
                overwrite: true,
                invalidate: true,
                resource_type: "image",
            },
            (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(buffer);
    });

export const uploadProfilePicture = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // 1. fingerprint of the new image
        const hash = crypto
            .createHash("sha256")
            .update(req.file.buffer)
            .digest("hex");

        // 2. same image as the current one? skip the upload
        const current = await User.findById(req.user._id);
        if (current.profilePicture && current.profilePictureHash === hash) {
            return res.status(200).json({
                message: "Same image, no upload needed",
                profilePicture: current.profilePicture,
            });
        }

        // 3. different image: upload and save URL + hash
        const result = await uploadToCloudinary(req.file.buffer, req.user._id);

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { profilePicture: result.secure_url, profilePictureHash: hash },
            { new: true }
        );

        res.status(200).json({
            message: "Profile picture updated",
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        next(error);
    }
};