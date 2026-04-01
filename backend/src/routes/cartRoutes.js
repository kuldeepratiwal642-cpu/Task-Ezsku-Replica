const express = require("express");
const router = express.Router();

const verifyToken = require("../middlewares/verifyToken");
const {
  addToCart,
  updateToCart,
  getCart,
  removeCart,
  moveToCart,
  saveToLater,
} = require("../controllers/cartCantroller");

router.post("/add_to_cart", verifyToken, addToCart);
router.put("/update_to_cart", verifyToken, updateToCart);
router.get("/get_cart", verifyToken, getCart);
router.delete("/remove_cart", verifyToken, removeCart);
router.put("/move_to_cart", verifyToken, moveToCart);
router.put("/save_to_later", verifyToken, saveToLater);

module.exports = router;
