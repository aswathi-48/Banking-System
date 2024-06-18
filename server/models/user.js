import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({

    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'client',
    },
    address: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true,
    },
    date_of_birth: {
        type: Date,
        require: true,
    },
    image: {
        type: String,
        default:null
    },
    isdeleted: {
        type: Boolean,
        default: false
      }

}, { timestamps: true})

const User = mongoose.model("userValues",UserSchema)

export default User