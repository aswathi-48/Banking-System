import Transaction from "../models/transaction.js";
import HttpError from "../middlewares/httpError.js";
import { validationResult } from "express-validator";

export const deposit = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, please check your data before retry!", 422));
        }

        const { userId } = req.userDetails;
        const { amount } = req.body;

        const newTransaction = new Transaction({
            user: userId,
            type: "deposit",
            amount,
        });

        const savedTransaction = await newTransaction.save();

        // Update user's account balance or other relevant logic

        res.status(200).json({
            status: true,
            message: "Deposit successful",
            data: savedTransaction,
        });
    } catch (err) {
        return next(new HttpError("Oops! Process failed, please contact admin.", 500));
    }
};

export const withdraw = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, please check your data before retry!", 422));
        }

        const { userId } = req.userDetails;
        const { amount } = req.body;

        const newTransaction = new Transaction({
            user: userId,
            type: "withdraw",
            amount,
        });

        const savedTransaction = await newTransaction.save();

        // Update user's account balance or other relevant logic

        res.status(200).json({
            status: true,
            message: "Withdrawal successful",
            data: savedTransaction,
        });
    } catch (err) {
        return next(new HttpError("Oops! Process failed, please contact admin.", 500));
    }
};

export const getTransactions = async (req, res, next) => {
    try {
        const { userId } = req.userDetails;
        const transactions = await Transaction.find({ user: userId });

        res.status(200).json({
            status: true,
            message: "Transactions retrieved successfully",
            data: transactions,
        });
    } catch (err) {
        return next(new HttpError("Oops! Process failed, please contact admin", 500));
    }
};
