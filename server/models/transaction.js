import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userValues",
        required: true,
    },
    type: {
        type: String,
        enum: ["deposit", "withdraw"],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
