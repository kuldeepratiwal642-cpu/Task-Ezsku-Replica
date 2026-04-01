const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {

    const authHeader = req.headers["authorization"]

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        console.error("No token provided or invalid format");
        return res.status(401).json({ status: false, message: "Access denied. No token provided." })
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Token verified, decoded:", decoded);

        req.user = decoded

        next()

    } catch (error) {
        console.error("Token verification error:", error.message);
        return res.status(401).json({ message: "Invalid token", error: error.message })
    }
}

module.exports = verifyToken
