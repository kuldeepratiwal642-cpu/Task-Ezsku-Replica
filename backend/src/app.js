require("dotenv").config();
const path = require('path')
const express = require("express")
const authRoutes = require("./routes/authRoutes")
const authuser = require("./routes/userRoutes")
const authCategory = require("./routes/categoryRoutes")
const product = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes");
const connectDB = require("./config/db")
const cors = require("cors")
const app = express();

const PORT = process.env.PORT || 5000

connectDB()
app.use(cors())

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use("/api/user", authuser)
app.use('/api/category', authCategory)
app.use("/api/product", product)
app.use("/api/cart", cartRoutes);
app.use(express.static(path.join(__dirname, '..', "uploads")));
// app.get("/register", async (req, res) => {
//     // res.send(req.body)
//     console.log(req.body);
// })

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})
