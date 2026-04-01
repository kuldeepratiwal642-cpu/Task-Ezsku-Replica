const mongoose = require("mongoose");



const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },


        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true
        },
        otp: {
            type: Number
        },
        isVerifiedOTP: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true  // for createdAt and updateAt
    },
)

const User = mongoose.model("User", userSchema);
module.exports = User;