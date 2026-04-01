const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const GenrateOTP = require("../utils/genrate_otp")

// User Register
exports.register = async (req, res) => {

    try {
        const { name, email, password } = req.body

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ status: false, message: "All fields are required" })
        }


        const existUser = await User.findOne({ email })

        if (existUser) {
            return res.status(400).json({ status: false, message: "User Already Exists" })
        }

        let hashedPassword = await bcrypt.hash(password, 10) // convert bcrypt form password

        const otp = GenrateOTP()

        const user = new User({
            name,
            email,
            password: hashedPassword,
            otp: otp
        })

        await user.save()
        res.status(201).json({ status: true, user_id: user.id, message: "User Registration Successfully", user })

    } catch (error) {
        res.status(500).json({ status: false, message: "Server Error" })
    }
}

// User Login
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ status: false, message: "All Field's Required" })
        }

        const existUser = await User.findOne({ email })

        if (!existUser) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        let passMatch = await bcrypt.compare(password, existUser.password) // Check password

        if (!passMatch) {
            return res.status(400).json({ status: false, message: "Invalid Password" })
        }

        const token = jwt.sign({ user_id: existUser._id }, process.env.JWT_SECRET, { expiresIn: "100h" })

        res.status(200).json({ status: true, message: "User Login Successfully", token, user: existUser })
    } catch (error) {
        res.status(500).json({ status: false, message: "Server Error" })
    }
}



exports.VerifiedOtp = async (req, res) => {

    try {
        const { otp, email } = req.body;

        if (!otp || !email) {
            return res.status(400).json({ status: false, message: "OTP and email are required" })
        }

        const existUser = await User.findOne({ email })

        if (!existUser) {
            return res.status(400).json({ status: false, message: "User Not Found" })
        }

        if (existUser.otp !== otp) {
            return res.status(400).json({ status: false, message: "Wrong OTP" })
        }

        existUser.isVerifiedOTP = true
        existUser.otp = null

        await existUser.save()

        res.status(200).json({ status: true, message: "OTP Verified Successfully" })

    } catch (error) {
        res.status(500).json({ status: false, message: "Server Error" })
    }
}


