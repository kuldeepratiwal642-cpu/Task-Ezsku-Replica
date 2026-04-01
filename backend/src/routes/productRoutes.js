const express = require("express");
const router = express.Router();

const verifiedToken = require("../middlewares/verifyToken");
const uploadImageMiddleware = require("../middlewares/uplodeImageMiddleware");
const {
  addProduct,
  editProduct,
  productList,
  deleteProduct,
} = require("../controllers/productController");

router.post("/add_product", verifiedToken, uploadImageMiddleware, addProduct);
router.get("/product_list", productList);
router.put("/edit_product", verifiedToken, uploadImageMiddleware, editProduct);
router.delete("/delete_product", verifiedToken, deleteProduct);
router.delete("/delete_product/:id", verifiedToken, deleteProduct);

module.exports = router;


