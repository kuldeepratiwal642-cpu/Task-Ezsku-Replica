const express = require("express");
const router = express.Router();

const uploadImageMiddleware = require("../middlewares/uplodeImageMiddleware");
const {
  addCategory,
  editCategory,
  deleteCategory,
  categoryList,
} = require("../controllers/categoryController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/add_category", verifyToken, uploadImageMiddleware, addCategory);
router.get("/category_list", categoryList);
router.put("/edit_category", verifyToken, uploadImageMiddleware, editCategory);
router.delete("/delete_category", verifyToken, deleteCategory);
router.delete("/delete_category/:id", verifyToken, deleteCategory);

module.exports = router;
