const mongoose = require("mongoose");
const Category = require("../models/Category");
const Product = require("../models/Product");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Category Add
exports.addCategory = async (req, res) => {
  try {
    const { name, description, category_image } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        status: false,
        message: "Name and description are required",
      });
    }

    const trimmedName = name.trim();
    const existCategory = await Category.findOne({ name: trimmedName });

    if (existCategory) {
      return res.status(400).json({
        status: false,
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name: trimmedName,
      description,
      category_image,
    });

    return res.status(201).json({
      status: true,
      message: "Category added successfully",
      category,
      imageUrl: category.category_image
        ? `${process.env.WEB_URL}/${category.category_image}`
        : null,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Category already exists",
      });
    }

    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Category Edit
exports.editCategory = async (req, res) => {
  try {
    const id = req.params.id || req.body.id;
    const { name, description, category_image } = req.body;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid category ID" });
    }

    const updateData = {};

    if (name) {
      const trimmedName = name.trim();
      const existingCategory = await Category.findOne({
        name: trimmedName,
        _id: { $ne: id },
      });

      if (existingCategory) {
        return res.status(400).json({
          status: false,
          message: "Category already exists",
        });
      }

      updateData.name = trimmedName;
    }

    if (description !== undefined) {
      updateData.description = description;
    }

    if (category_image) {
      updateData.category_image = category_image;
    }

    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ status: false, message: "Category not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Category updated successfully",
      category: updatedCategory,
      imageUrl: updatedCategory.category_image
        ? `${process.env.WEB_URL}/${updatedCategory.category_image}`
        : null,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: false,
        message: "Category already exists",
      });
    }

    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Get Category List
exports.categoryList = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      totalCategory: categories.length,
      categoryList: categories,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Category Delete
exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id || req.body.id || req.query.id;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ status: false, message: "Invalid category ID" });
    }

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ status: false, message: "Category not found" });
    }

    const productsCount = await Product.countDocuments({ category: id });

    if (productsCount > 0) {
      return res.status(400).json({
        status: false,
        message: "Category cannot be deleted because products are linked to it",
      });
    }

    await Category.findByIdAndDelete(id);

    return res.status(200).json({
      status: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

