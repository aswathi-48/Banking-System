import { validationResult } from "express-validator";
import HttpError from "../middlewares/httpError.js";
import Account from "../models/account.js";


export const addAccount = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, please check your data before retry!", 422));
        }

        const { user: userId, account_no, branch, ifsc_code } = req.body;

        const newAccount = new Account({
            user: userId,
            account_no,
            branch,
            ifsc_code,
        });

        const savedAccount = await newAccount.save();

        res.status(200).json({
            status: true,
            message: "Account added successfully",
            data: savedAccount,
        });
    } catch (err) {
        return next(new HttpError("Oops! Process failed, please contact admin.", 500));
    }
};


export const getAccount = async (req, res, next) => {

    try {
        const { userId } = req.userDetails;
        console.log(userId,"user");

        const account = await Account.find({ user: userId, isDeleted: false });

            console.log(account,"gds");
            console.log("gds");

        if (!account) {
            
            return next(new HttpError("Account not found", 404));
        }

        res.status(200).json({
            status: true,
            message: "Account details retrieved successfully",
            data: account,
        });
    } catch (err) {
        return next(new HttpError("Oops! Process failed, please contact admin", 500));
    }
};

export const editAccount = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid inputs passed, please check ...", 422));
        }

        const { accountId, account_no, branch, ifsc_code } = req.body;
        // const { accountId } = req.params;

        const updatedAccount = await Account.findByIdAndUpdate(accountId, { account_no, branch, ifsc_code }, { new: true });

        if (!updatedAccount) {
            return next(new HttpError("Account not found", 404));
        }

        res.status(200).json({
            status: true,
            message: "Account details updated successfully",
            data: updatedAccount,
        });
    } catch (err) {
        return next(new HttpError("Oops! Process failed, please contact admin", 500));
    }
};

export const deleteAccount = async (req, res, next) => {
    try {
        const { accountId } = req.params;

        const deletedAccount = await Account.findByIdAndDelete(accountId);

        if (!deletedAccount) {
            return next(new HttpError("Account not found", 404));
        }

        res.status(200).json({
            status: true,
            message: "Account deleted successfully",
            data: deletedAccount,
        });
    } catch (err) {
        return next(new HttpError("Oops! Process failed, please contact admin", 500));
    }
};
