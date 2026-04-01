const express = require("express")
const Router = express.Router()
const verifyToken = require("../middlewares/verifyToken");


const {userProfile } = require("../controllers/userController")

Router.post("/userProfile", verifyToken, userProfile)

module.exports = Router