import HttpError from "../middlewares/httpError.js";
import { validationResult } from "express-validator";
import Transaction from "../models/transaction.js";
import Account from "../models/account.js";

export const deposit = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, please check your data before retry!", 422));
        }

        const { userId } = req.userDetails;
        const { amount } = req.body;

        // Create new transaction
        const newTransaction = new Transaction({
            user: userId,
            type: "deposit",
            amount,
        });

        const savedTransaction = await newTransaction.save();

        // Update user's account balance
        const account = await Account.findOne({ user: userId });
        if (!account) {
            return next(new HttpError("Account not found", 404));
        }

        account.balance += amount;
        await account.save();

        res.status(200).json({
            status: true,
            message: "Deposit successful",
            data: {
                transaction: savedTransaction,
                updatedAccount: account,
            },
        });
    } catch (err) {
        console.error(err);
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

        // Create new transaction
        const newTransaction = new Transaction({
            user: userId,
            type: "withdraw",
            amount,
        });

        const savedTransaction = await newTransaction.save();

        const account = await Account.findOne({ user: userId });
        if (!account) {
            return next(new HttpError("Account not found", 404));
        }

        if (account.balance < amount) {
            return next(new HttpError("Insufficient balance", 400));
        }

        account.balance -= amount;
        await account.save();

        res.status(200).json({
            status: true,
            message: "Withdrawal successful",
            data: {
                transaction: savedTransaction,
                updatedAccount: account,
            },
        });
    } catch (err) {
        console.error(err);
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
