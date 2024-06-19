import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    user: {
        ref: "userValue",
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    account_no: {
        type: String,
        require: true,
    },
    branch: {
        type: String,
        require: true,
    },
    balance: {
        type: String,
        require: true,
    },
    ifsc_code: {
        type: String,
        require: true,
    },
    isdeleted: {
        type: Boolean,
        default: false
      }
}, { timestamps: true})

const Account = mongoose.model("account",AccountSchema)

export default Account