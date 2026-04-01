const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

// Get User Profile
exports.userProfile = async (req, res) => {

    try {

        const userId = req.user.user_id

        const ExistUser = await User.findById(userId)

        if (!ExistUser) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        res.status(200).json({ status: true, message: "User Profile Fetched Successfully", User: ExistUser })

    } catch (error) {
        res.status(500).json({ status: false, message: "Server Error", error })
    }
}