const express = require("express")
const router = express.Router()

const { register, Login , VerifiedOtp} = require("../controllers/authController");

router.post("/register", register)
router.post("/login", Login)
router.post("/VerifiedOtp", VerifiedOtp)


module.exports = router