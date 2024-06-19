import { validationResult } from "express-validator";
import HttpError from "../middlewares/httpError.js";
import Account from "../models/account.js";


export const addAccount = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid data inputs passed, please check your data before retry!", 422));
        }

        const { user: userId, account_no, branch, ifsc_code , balance} = req.body;

        const newAccount = new Account({
            user: userId,
            account_no,
            branch,
            ifsc_code,
            balance,
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


// export const getAccount = async (req, res, next) => {
//     try {
//         const { userId } = req.userDetails;
//         console.log(userId, "user");

//         if (!userId) {
//             return next(new HttpError("User ID not found in request details", 400));
//         }

//         const query = { user: userId, isdeleted: false };
//         console.log('MongoDB Query:', query);

//         const account = await Account.find(query);

//         console.log(account, "account data");

//         if (account.length === 0) {
//             return next(new HttpError("Account not found", 404));
//         }

//         res.status(200).json({
//             status: true,
//             message: "Account details retrieved successfully",
//             data: account,
//         });
//     } catch (err) {
//         console.error(err);
//         return next(new HttpError("Oops! Process failed, please contact admin", 500));
//     }
// };


// export const getAccount = async (req, res, next) => {


//     try {
//         console.log('User Details:', req.userDetails);

//         const userId = req.userDetails.userId; 
        
//         console.log('User ID:', userId);

//         const accounts = await Account.find({ user: userId, isDeleted: false }).populate('user');
        
//         console.log('Accounts:', accounts);

//         if (!accounts.length) {
//             return next(new HttpError("Account not found", 404));
//         }

//         res.status(200).json({
//             status: true,
//             message: "Account details retrieved successfully",
//             data: accounts,
//         });
//     } catch (err) {
//         return next(new HttpError("Oops! Process failed, please contact admin", 500));
//     }
// };

export const getAccount = async (req, res, next) => {
    try {
      const userId = req.userDetails.userId; // Extract userId from req.userDetails
      const accounts = await Account.find({ user: userId, isDeleted: false }).populate('user');
  
      if (!accounts || accounts.length === 0) {
        return res.status(404).json({
          status: false,
          message: 'Account not found',
          data: null,
        });
      }
  
      res.status(200).json({
        status: true,
        message: 'Account details retrieved successfully',
        data: accounts,
      });
    } catch (error) {
      console.error('Error fetching account details:', error);
      return res.status(500).json({
        status: false,
        message: 'Oops! Process failed, please contact admin',
        data: null,
      });
    }
  };



  export const getAllAccounts = async (req, res, next) => {
    try {
        console.log("Fetching all accounts...");

        const accounts = await Account.find()
        // .populate({
        //     path: "user",
        //     select: "first_name email"
        // });

        console.log("Accounts retrieved:", accounts); 

        if (!accounts || accounts.length === 0) {
            console.log("No accounts found.");
            return res.status(404).json({
                status: false,
                message: 'No accounts found',
                data: null,
            });
        }

        res.status(200).json({
            status: true,
            message: 'Accounts retrieved successfully',
            data: accounts,
        });
    } catch (error) {
        console.error('Error fetching accounts:', error);
        return res.status(500).json({
            status: false,
            message: 'Oops! Process failed, please contact admin',
            data: null,
        });
    }
};



export const editAccount = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HttpError("Invalid inputs passed, please check ...", 422));
        }

        const { accountId, account_no, branch, ifsc_code, balance } = req.body;
        // const { accountId } = req.params;

        const updatedAccount = await Account.findByIdAndUpdate(accountId, { account_no, branch, ifsc_code, balance }, { new: true });

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
