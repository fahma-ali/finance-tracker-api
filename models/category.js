import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true, trim: true },
    type: { type: String, enum: ["income", "expense"], required: true },
});

export default mongoose.model("Category", categorySchema);