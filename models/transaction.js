import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true,trim:true },
    amount: { type: Number, required: true, min: "00.1" },
    type: {
        type: String,
        enum: ["income", "expense"],
        required:true
    },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
},{timestamps:true});

export default mongoose.model("Transaction", transactionSchema);